const { Router } = require("express");
const router = Router();
const passport = require("passport");
const loginPageController = require("../controller/loginPageCotroller");
const signUpPageController = require("../controller/signUpPageController");
const homePageController = require("../controller/homePageController");
const checkUnauthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    // If the user is authenticated, redirect to another page (e.g., home page)
    return res.redirect("/");
  }
  // If the user is not authenticated, continue to the next middleware or route handler
  next();
};
const checkAuthenticated = function (req, res, next) {
  if (!req.isAuthenticated()) {
    // If the user is authenticated, redirect to another page (e.g., home page)
    return res.redirect("/login");
  }
  // If the user is not authenticated, continue to the next middleware or route handler
  next();
};
router.route("").get(checkAuthenticated, homePageController.homePageView);
router
  .route("/login")
  .get(checkUnauthenticated, loginPageController.viewLoginPage)
  .post(function (req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/signUp",
      failureFlash: true,
    })(req, res, next);
  });
router
    .route("/signUp")
    .get(checkUnauthenticated, signUpPageController.viewSignUpPage)
    .post(signUpPageController.signUp);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
