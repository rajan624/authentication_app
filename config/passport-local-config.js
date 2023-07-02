const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const logger = require("./logger");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    async function verify( username, password, done) {
      // find a user and establish the identity
      try {
        const user = await User.findOne({ email: username });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.name , useremail :user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/login');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;