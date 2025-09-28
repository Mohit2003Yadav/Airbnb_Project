const { name } = require("ejs");
let express = require("express");
let app = express();
var flash = require("connect-flash");
let path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const session = require("express-session");
let sessionOption = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOption));
app.use(flash());
app.get("/test", (req, res) => {
  res.send("test successful");
});

app.get("/reqcount", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }

  res.send(`sesion count is ${req.session.count}`);
});

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  if (name === "anonymous") {
    req.flash("error", "something went wrong");
  } else {
    req.flash("success", "user login successfully");
  }

  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  // res.send(`hello ${req.session.name}`);
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.render("new.ejs", { name: req.session.name });
});

app.listen(3000, () => {
  console.log("server is listening to 3000");
});
