const express = require("express");
const app = express();
const session = require("express-session");
const connect = require("./config/mongoDb-config");
const logger = require("./config/logger");
require("dotenv").config();
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const passportLocal = require("./config/passport-local-config");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const port = process.env.PORT || 8000;
const homeRouter = require("./routers/homeRouter");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
app.use(express.static(path.join(__dirname, "assets")));
app.use(expressLayout);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(express.urlencoded());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
//creating session of user
app.use(
  session({
    name: "auth_app",
    secret: "we are testing here",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://0.0.0.0:27017/auth_app",
      autoRemove: "interval",
      autoRemoveInterval: 10, // In minutes. Default
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customMware.setFlash);
app.use("", homeRouter);

connect()
  .then(() => {
    app.listen(port, function (error) {
      if (error) {
        logger.log(`Error running port ${error}`);
      } else {
        logger.log(`Server started on ${port}`);
      }
    });
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error}`);
  });
