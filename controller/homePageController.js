function homePageView(req, res) {
    res.render("homePage", {
        title:"Home Page"
    })
}

module.exports = {
    homePageView
}