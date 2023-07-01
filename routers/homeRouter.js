const { Router } = require("express");
const router = Router();
const passport = require("passport");
const loginPageController = require("../controller/loginPageCotroller");
const signUpPageController = require("../controller/signUpPageController");
const homePageController = require("../controller/homePageController");


router
  .route("")
  .get(passport.checkAuthentication,homePageController.homePageView);
router
  .route("/login")
  .get(loginPageController.viewLoginPage)
  .post(
    (req, res, next) => {
      try {
        passport.authenticate("local", { failureRedirect: "/" })(
          req,
          res,
          next
        );
      } catch (err) {
        logger.error(err);
      }
    },
    loginPageController.login
  );
router.route("/signUp").get(signUpPageController.viewSignUpPage).post(signUpPageController.signUp);

module.exports = router;