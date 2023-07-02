const logger = require("../config/logger");
const flash = require("express-flash");

const User = require("../models/user.model");

//rendering login page
function viewLoginPage(req, res) {
    res.render("login", {
        title: "Login"
    })
}

//handling login success
function loginHandle(req, res) {
  req.flash("success", "login Successfully!");
  res.redirect("/");
}

module.exports = {
  viewLoginPage,
  loginHandle,
};