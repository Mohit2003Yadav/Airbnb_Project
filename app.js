// app.js - corrected and ready to use
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("DB URL:", process.env.AtlasDB_URL ? "✅ Loaded" : "❌ Not Loaded");
const Db_Url = process.env.AtlasDB_URL;

// Helper function to validate MongoDB connection string format
// Note: If your password contains special characters (@, #, $, %, etc.), 
// they must be URL-encoded in the connection string (e.g., @ becomes %40)
function validateMongoUrl(url) {
  if (!url) return null;
  
  // Check if it's a valid MongoDB URL format
  if (!url.startsWith('mongodb://') && !url.startsWith('mongodb+srv://')) {
    return null;
  }
  
  return url;
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Listing = require("./models/listing");

// --- MongoDB Connection Setup ---
async function connectToMongo() {
  try {
    if (!Db_Url) {
      throw new Error("AtlasDB_URL environment variable is not set.");
    }
    
    // Validate the connection string format
    const validatedUrl = validateMongoUrl(Db_Url);
    const connectionUrl = validatedUrl || Db_Url;
    
    // Validate connection string format
    if (!connectionUrl.startsWith('mongodb://') && !connectionUrl.startsWith('mongodb+srv://')) {
      throw new Error("Invalid MongoDB connection string format. Must start with 'mongodb://' or 'mongodb+srv://'");
    }
    
    // Remove deprecated options - they are no longer needed in mongoose 8.x
    // useNewUrlParser and useUnifiedTopology are deprecated and have no effect
    await mongoose.connect(connectionUrl);
    console.log("✅ MongoDB connection successful");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    
    // Provide helpful error messages for common issues
    if (err.message.includes('authentication failed') || err.message.includes('bad auth')) {
      console.error("💡 Authentication Error Tips:");
      console.error("   1. Check if your MongoDB username and password are correct");
      console.error("   2. Ensure special characters in password are URL-encoded (e.g., @ becomes %40)");
      console.error("   3. Verify the database user has proper permissions");
      console.error("   4. Check if your IP address is whitelisted in MongoDB Atlas");
    } else if (err.message.includes('ENOTFOUND') || err.message.includes('getaddrinfo')) {
      console.error("💡 Network Error Tips:");
      console.error("   1. Check your internet connection");
      console.error("   2. Verify the MongoDB host address is correct");
      console.error("   3. Check if MongoDB Atlas cluster is running");
    }
    
    console.error("Full error:", err);
    process.exit(1); // Exit if DB connection fails
  }
}

// Start the connection process immediately
const dbConnectionPromise = connectToMongo();

// --- Views configuration ---
const viewsDir = path.join(process.cwd(), "views");
app.set("view engine", "ejs");
app.set("views", viewsDir);

// Debug logs — remove these after verifying deployment

// --- Middleware ---
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", require("ejs-mate"));
app.use(methodOverride("_method"));
app.use(express.static(path.join(process.cwd(), "public"))); // use process.cwd() to match views usage

// --- Session Configuration ---
// Only create Mongo-backed sessions in production. In development, the
// default in-memory session store avoids a second DB connection during startup.
let store = null;
if (Db_Url && process.env.NODE_ENV === "production") {
  try {
    // Use validated URL for session store as well
    const validatedUrl = validateMongoUrl(Db_Url);
    const sessionStoreUrl = validatedUrl || Db_Url;
    
    store = MongoStore.create({
      mongoUrl: sessionStoreUrl,
      crypto: {
        secret: process.env.secretCode || "defaultSecretForDev",
      },
      touchAfter: 24 * 3600,
    });

    store.on("error", function (e) {
      console.error("❌ Session store error:", e.message);
    });
    
    store.on("connected", function () {
      console.log("✅ Session store connected");
    });
  } catch (err) {
    console.error("❌ Failed to create session store:", err.message);
  }
}

const sessionOption = {
  secret: process.env.secretCode || "defaultSecretForDev",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // expires expects a Date object
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "lax",
  },
};

// Only add store if it was successfully created
if (store) {
  sessionOption.store = store;
}

app.use(session(sessionOption));
app.use(flash());

// --- Passport Configuration ---
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --- Routers ---
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const bookingRouter = require("./routes/booking.js");

// --- Flash + current user middleware ---
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Mount routers (order matters)
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", bookingRouter);
app.use("/", userRouter);

// --- Homepage route ---
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// --- Catch-all and Error Handlers ---
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  // Render an error page; ensure views/error.ejs exists
  res.status(status).render("error.ejs", { err: { status, message, stack: err.stack } });
});

// --- Start Express server only after DB connected ---
dbConnectionPromise.then(() => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} and DB is connected.`);
  });
}).catch((err) => {
  console.error("DB connection promise rejected:", err);
  process.exit(1);
});

module.exports = app;
