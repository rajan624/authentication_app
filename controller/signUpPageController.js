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
  const { name, email, password} = req.body;
  if (!name || !email || !password) {
        // return req.flash("success", "Flash message example!");
  }
  try {
    const mailCheck = await User.findOne({ email });
    // if (mailCheck) return res.status(400).json({ msg: "Email already exists" });
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
    res.redirect("/login")
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = {
    viewSignUpPage,
    signUp
};
