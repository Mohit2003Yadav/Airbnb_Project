if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

app.set("trust proxy", 1); // Required for Render cookies/session

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const ejsMate = require("ejs-mate");

// ================= ROUTERS =================
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const bookingRouter = require("./routes/booking.js");

// ================= DATABASE =================
const Db_Url = process.env.ATLASDB_URL;

console.log(
  "DB URL:",
  Db_Url ? "✅ Loaded" : "❌ Not Loaded"
);

async function connectDB() {
  try {
    if (!Db_Url) {
      throw new Error(
        "ATLASDB_URL environment variable is missing"
      );
    }

    await mongoose.connect(Db_Url);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error(
      "❌ MongoDB Connection Error:"
    );
    console.error(err.message);
    process.exit(1);
  }
}

// ================= VIEW ENGINE =================
app.set("view engine", "ejs");
app.set(
  "views",
  path.join(__dirname, "views")
);
app.engine("ejs", ejsMate);

// ================= MIDDLEWARE =================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  express.static(
    path.join(__dirname, "public")
  )
);

// ================= SESSION STORE =================
const store = MongoStore.create({
  mongoUrl: Db_Url,
  crypto: {
    secret:
      process.env.SECRET_CODE ||
      "defaultSecretForDev",
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log(
    "❌ Mongo Session Store Error",
    err
  );
});

const sessionOptions = {
  store,
  secret:
    process.env.SECRET_CODE ||
    "defaultSecretForDev",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: new Date(
      Date.now() +
        7 * 24 * 60 * 60 * 1000
    ),
    maxAge:
      7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure:
      process.env.NODE_ENV ===
      "production",
    sameSite: "lax",
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ================= PASSPORT =================
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    User.authenticate()
  )
);

passport.serializeUser(
  User.serializeUser()
);

passport.deserializeUser(
  User.deserializeUser()
);

// ================= GLOBAL LOCALS =================
app.use((req, res, next) => {
  res.locals.success =
    req.flash("success");

  res.locals.error =
    req.flash("error");

  res.locals.currUser =
    req.user;

  next();
});

// ================= ROUTES =================
app.use(
  "/listings",
  listingsRouter
);

app.use(
  "/listings/:id/reviews",
  reviewsRouter
);

app.use("/bookings", bookingRouter);

app.use("/", userRouter);

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
  req.flash(
    "success",
    "Welcome to Airbnb!"
  );

  res.redirect("/listings");
});

// ================= 404 HANDLER =================
app.use((req, res, next) => {
  next(
    new ExpressError(
      404,
      "Page Not Found"
    )
  );
});


// ================= ERROR HANDLER =================
app.use(
  (err, req, res, next) => {
    let {
      status = 500,
      message =
        "Something went wrong",
    } = err;

    res.status(status).render(
      "error.ejs",
      {
        err: {
          status,
          message,
        },
      }
    );
  }
);

// ================= SERVER =================
connectDB().then(() => {
  const PORT =
    process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(
      `🚀 Server running on port ${PORT}`
    );
  });
});