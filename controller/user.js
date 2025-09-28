let User = require("../models/user");

module.exports.showSignupForm=(req, res) => {
  res.render("users/signUp.ejs");
}

module.exports.showLoginForm=(req, res) => {
  res.render("users/login.ejs");
}

module.exports.Signup=async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ username, email });
      let registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to WanderLust");
      res.redirect("/listings");
      });
      console.log(registeredUser);
      
    } catch (er) {
      req.flash("error", er.message);
      res.redirect("/signup");
    }
  }

  module.exports.login=async (req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }

  module.exports.logout=(req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash("success", "you are logout !");
    res.redirect("/listings");
  });
}