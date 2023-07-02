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
    // If the user is Unauthenticated, redirect to login page (e.g., home page)
    return res.redirect("/login");
  }
  // If the user is not authenticated, continue to the next middleware or route handler
  next();
};
//routes 
router.route("").get(checkAuthenticated, homePageController.homePageView);
router
  .route("/login")
  .get(checkUnauthenticated, loginPageController.viewLoginPage)
  .post(function (req, res, next) {
    passport.authenticate("local", {
      // successRedirect: "/",
      failureRedirect: "/signUp",
      failureFlash: true,
    })(req, res, next);
  }, loginPageController.loginHandle);
router
  .route("/signUp")
  .get(checkUnauthenticated, signUpPageController.viewSignUpPage)
  .post(signUpPageController.signUp);
router
  .route("/resetPassword")
  .get(checkAuthenticated, homePageController.resetPasswordView)
  .post(checkAuthenticated, homePageController.resetPassword);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err̥);
    }
    req.flash("success", "logout Successfully!");
    res.redirect("/login");
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    // successRedirect: "/",
  }),
  loginPageController.loginHandle
);

module.exports = router;
