const logger = require("../config/logger");
const flash = require("express-flash");

const User = require("../models/user.model");
function viewLoginPage(req, res) {
    res.render("login", {
        title: "Login"
    })
}

module.exports = {
    viewLoginPage
}