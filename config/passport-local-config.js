const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const logger = require("./logger");

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
   async function(email, password, done){
     logger.log("Still working here",email)
        // find a user and establish the identity
       const user = await User.findOne({email: email})
            if (!user){
                logger.info('Invalid Username/Password');
                return done(null, false);
     }
            return done(null, user);
    }
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done){
  const user = await User.findById({ id });
        if(!user){
            logger.error('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
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