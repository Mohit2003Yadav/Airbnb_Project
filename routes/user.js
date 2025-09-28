const express = require("express");
let router = express.Router({ mergeParams: true }); // <-- mergeParams is important!
let User = require("../models/user");
let wrapAsync = require("../utils/wrapAsync.js");
let ExpressError = require("../utils/ExpressError.js");
let passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
let userController = require("../controller/user.js");

router.get("/signup", userController.showSignupForm);

router.get("/login", userController.showLoginForm);

router.post(
  "/signup",
  wrapAsync(userController.Signup)
);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  wrapAsync(userController.login)
);

router.get("/logout", userController.logout);

module.exports = router;
