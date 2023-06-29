const { Router } = require("express");
const router = Router();
const loginPageController = require("../controller/loginPageCotroller");
const signUpPageController = require("../controller/signUpPageController");
const homePageController = require("../controller/homePageController");


router.route("").get(homePageController.homePageView);
router.route("/login").get(loginPageController.viewLoginPage);
router.route("/signUp").get(signUpPageController.viewSignUpPage);

module.exports = router;