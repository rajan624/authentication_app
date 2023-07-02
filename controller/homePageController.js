const User = require("../models/user.model");
const logger = require("../config/logger");
const bcrypt = require("bcryptjs");

//render homepage
function homePageView(req, res) {
    res.render("homePage", {
      title: `${req.user.username} Home Page`,
      name: req.user.username,
      email: req.user.useremail,
    });
}

// render reset password page
function resetPasswordView(req, res) {
  
    res.render("resetPassword", {
      title: `${req.user.username} Forgot Password`
    });
}


//resetting user password

async function resetPassword(req, res) {
  const { password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.user.useremail });

    if (!user) {
      logger.error(`User not found: ${req.user.useremail}`);
    }

    // Generate a new hash for the new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hash;
    await user.save();
  req.flash("success", "Password Updated Successfully!");
    res.redirect("/");
  } catch (error) {
    logger.error(`Error resetting password: ${error}`);
  }
}



module.exports = {
  homePageView,
  resetPasswordView,
  resetPassword
};