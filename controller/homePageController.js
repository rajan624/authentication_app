function homePageView(req, res) {
    res.render("homePage", {
      title: `${req.user.username} Home Page`,
      name: req.user.username,
      email: req.user.useremail,
    });
}

module.exports = {
    homePageView
}