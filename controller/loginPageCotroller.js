const logger = require("../config/logger");
const flash = require("express-flash");
const User = require("../models/user.model");
function viewLoginPage(req, res) {
    res.render("login", {
        title: "Login"
    })
}

const login = async (req, res) => {
    res.redirect("/")
//   const { email, password } = req.body;
//   // Validation
//     logger.log(req.body)
//   if (!email || !password) {
//     return res.status(400).json({ msg: "Please enter all feilds" });
//   }

//   try {
//     // Check exisitng User
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ msg: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ msg: "Invalid email or password" });
//     const token = jwt.sign({ id: user._id }, JWT_SECRET, {
//       expiresIn: 3600000,
//     });
//     if (!token) return res.status(500).json({ msg: "Internal Server Error" });
//     res.status(200).json({
//       token,
//     });
//   } catch (err) {
//     res.status(400).json({ msg: err.message });
//   }
};

module.exports = {
    viewLoginPage,
    login
}