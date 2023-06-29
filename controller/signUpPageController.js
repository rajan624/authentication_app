
function viewSignUpPage(req, res) {
  res.render("signup", {
    title: "Sign Up",
  });
}

module.exports = {
  viewSignUpPage,
};
