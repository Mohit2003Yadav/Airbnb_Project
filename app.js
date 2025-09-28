
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
};


let express = require("express");
let app = express();
let mongoose = require("mongoose");
let path = require("path");
let methodOverride = require("method-override");
let engine = require("ejs-mate");
let ExpressError = require("./utils/ExpressError.js");
let Review = require("./models/review");
const session = require("express-session");
let flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


// Session configuration
let sessionOption = {
  secret: "mysupersecretstring",
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
const mong_url = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  await mongoose.connect(mong_url);
}
main()
  .then(() => console.log("Successful connection"))
  .catch((err) => console.log(err));

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

// Demo user creation
// app.get("/demouser", async (req, res) => {
//   const fakeuser = new User({
//     username: "demouser",
//     email: "demouser@example.com",
//   });
//   let registeredUser = await User.register(fakeuser, "yadav123");
//   res.send(registeredUser);
// });

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
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});


// Server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
