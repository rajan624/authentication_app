const express = require("express");
const app = express();

const port = 8000;


app.get("/", (req, res) => {
    console.log("Server is working now");
    res.send(`<h1>we are testing our server</h1>`)
});

app.listen(port, function (error) {
    if (error) {
        console.log('Error starting server');
    }
    else {
        console.log(`Server started on ${port}`);
    }
    
});