
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
};

console.log("DB URL:", process.env.AtlasDB_URL ? "✅ Loaded" : "❌ Not Loaded");
const Db_Url= process.env.AtlasDB_URL;

let express = require("express");
let app = express();
let mongoose = require("mongoose");
let path = require("path");
let methodOverride = require("method-override");
let engine = require("ejs-mate");
let ExpressError = require("./utils/ExpressError.js");
let Review = require("./models/review");
const session = require("express-session");
const MongoStore = require('connect-mongo');
let flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


// Session configuration

const store=MongoStore.create({
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
    expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};



// Middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(session(sessionOption));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MongoDB connection
// const mong_url = "mongodb://127.0.0.1:27017/wanderlust";

console.log("checking is going on");

console.log(Db_Url);

async function main() {
  await mongoose.connect(Db_Url);
}
main()
  .then(() => console.log("Successful connection"))
  .catch((err) => console.log(err));


// async function main() {
//   try {
//     console.log("Connecting to:", process.env.AtlasDB_URL);
//      mongoose.connect(process.env.AtlasDB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB connection successful");

//     // Start server only after DB is connected
//     app.listen(8080, () => {
//       console.log("Server is listening on port 8080");
//     });

//   } catch (err) {
//     console.error("❌ MongoDB connection failed:", err.message);
//     process.exit(1);
//   }
// }

// main();


// Routes
let listingsRouter = require("./routes/listing.js");
let reviewsRouter = require("./routes/review.js");
let userRouter= require("./routes/user.js");

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

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // helpful for debugging
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { err });
});

// Catch-all route



// Server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});