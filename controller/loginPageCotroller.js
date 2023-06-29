function viewLoginPage(req, res) {
    res.render("login", {
        title: "Login"
    })
}



module.exports = {
    viewLoginPage
}