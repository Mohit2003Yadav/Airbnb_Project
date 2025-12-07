if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("DB URL:", process.env.AtlasDB_URL ? "✅ Loaded" : "❌ Not Loaded");
const Db_Url = process.env.AtlasDB_URL;

let express = require("express");
let app = express();
let mongoose = require("mongoose");
let path = require("path");
let methodOverride = require("method-override");
let ExpressError = require("./utils/ExpressError.js");
let Review = require("./models/review");
const session = require("express-session");
const MongoStore = require('connect-mongo');
let flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Listing = require("./models/listing"); // add near top

// --- MongoDB Connection Setup ---

async function connectToMongo() {
  try {
    if (!Db_Url) {
      throw new Error("AtlasDB_URL environment variable is not set.");
    }
    // FIX: Await connection for startup integrity.
    await mongoose.connect(Db_Url);
    console.log("✅ MongoDB connection successful");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.error(err.stack);
    process.exit(1); // Exit if DB connection fails
  }
}

// Start the connection process immediately, saving the promise
const dbConnectionPromise = connectToMongo();


// --- Session Configuration ---

const store = MongoStore.create({
  mongoUrl: Db_Url,
  crypto: {
    secret: process.env.secretCode,
  },
  touchAfter: 24 * 3600,
});

store.on("error", function(e){
  console.log("Session store error", e);
});

let sessionOption = {
  store,
  secret: process.env.secretCode,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // FIX: Corrected deprecated option 'expire' to 'expires'
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


// --- Middleware ---
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', require('ejs-mate'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(session(sessionOption));
app.use(flash());

// --- Passport Configuration ---
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// --- Routes ---
let listingsRouter = require("./routes/listing.js");
let reviewsRouter = require("./routes/review.js");
let userRouter = require("./routes/user.js");

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routers
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// // ADDED: Explicit Homepage route to prevent 404 on root access (if not in userRouter)
// app.get("/", (req, res) => {
//     res.render("listings/index.ejs"); // Assuming this is your main homepage view
// });


app.get("/", async (req, res, next) => {
  try {
    const listings = await Listing.find({});
    return res.render("listing", { list: listings }); // render views/listing.ejs
  } catch (e) {
    next(e);
  }
});
// --- Error Handlers ---

// ADDED: Catch-all route (Restored to handle all undefined paths and log errors)
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// General Error handler
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { err: { status, message, stack: err.stack } });
});


// --- Server Start (CRITICAL FIX) ---
// FIX: Server only starts after the database connection promise resolves successfully.
dbConnectionPromise.then(() => {
  app.listen(8080, () => {
    console.log("Server is listening on port 8080 and DB is connected.");
  });
});