const express = require("express");
const app = express();
require("dotenv").config();
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const port = process.env.PORT || 8000;
const homeRouter = require("./routers/homeRouter");
app.use(express.static(path.join(__dirname, "assets")));
app.use(expressLayout);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(express.urlencoded());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use("", homeRouter);

app.listen(port, function (error) {
    if (error) {
        console.log('Error starting server');
    }
    else {
        console.log(`Server started on ${port}`);
    }
    
});