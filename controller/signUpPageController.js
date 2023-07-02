const logger = require("../config/logger");
const User = require("../models/user.model");
const flash = require("express-flash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
function viewSignUpPage(req, res) {
  res.render("signup", {
    title: "Sign Up",
  });
}
const signUp = async (req, res) => {
 
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    req.flash("error", "Please fill All data");
   return  res.redirect("/signUp");
  }
  try {
    const mailCheck = await User.findOne({ email });
    if (mailCheck) {
      req.flash("error", "Email Already Exists");
     return res.redirect("/login");
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing password");

    const newUser = new User({
      name: name,
      email: email,
      password: hash,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");
    req.flash("success", "Sign Up Successfully!");
    return res.redirect("/login")
  } catch (err) {
     req.flash("error", "Something went wrong");
   return  res.redirect("/signUp");
  }
};
module.exports = {
    viewSignUpPage,
    signUp
};
