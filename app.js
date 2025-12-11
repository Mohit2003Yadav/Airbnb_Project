// app.js - corrected and ready to use
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("DB URL:", process.env.AtlasDB_URL ? "✅ Loaded" : "❌ Not Loaded");
const Db_Url = process.env.AtlasDB_URL;

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
    // Await connection for startup integrity.
    await mongoose.connect(Db_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connection successful");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.error(err.stack);
    process.exit(1); // Exit if DB connection fails
  }
}

// Start the connection process immediately
const dbConnectionPromise = connectToMongo();

// --- Views configuration & debug (robust for various deploy layouts) ---
const viewsDir = path.join(process.cwd(), "views");
app.set("view engine", "ejs");
app.set("views", viewsDir);

// Debug logs — remove these after verifying deployment
console.log("===== EXPRESS VIEWS DEBUG =====");
console.log("process.cwd():", process.cwd());
console.log("__dirname:", __dirname);
console.log('app.get("views"):', app.get("views"));
console.log(
  "listings/index.ejs exists?:",
  fs.existsSync(path.join(app.get("views"), "listings", "index.ejs"))
);
console.log(
  "views root listing:",
  fs.existsSync(app.get("views")) ? fs.readdirSync(app.get("views")) : "views folder not found"
);
console.log("================================");

// --- Middleware ---
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", require("ejs-mate"));
app.use(methodOverride("_method"));
app.use(express.static(path.join(process.cwd(), "public"))); // use process.cwd() to match views usage

// --- Session Configuration ---
const store = MongoStore.create({
  mongoUrl: Db_Url,
  crypto: {
    secret: process.env.secretCode || "defaultSecretForDev",
  },
  touchAfter: 24 * 3600,
});

store.on("error", function (e) {
  console.log("Session store error", e);
});

const sessionOption = {
  store,
  secret: process.env.secretCode || "defaultSecretForDev",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // expires expects a Date object
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

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
app.use("/", userRouter);

// --- Homepage route: render the listings index view ---
// NOTE: Render the same view path your app expects: views/listings/index.ejs
app.get("/", async (req, res, next) => {
  try {
    const listings = await Listing.find({});
    // render views/listings/index.ejs and pass listings
    return res.render("listings/index", { list: listings });
  } catch (e) {
    next(e);
  }
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
