const express = require("express");
const app = express();
const CookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileupload = require('express-fileupload'); 

const ErrorHandler = require('./middleware/ErrorHandler');

app.use(express.json())
app.use(CookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

// importing routes
const adminRoute = require("./routes/adminRoute");
app.use("/api/v1", adminRoute);

// using middleware
app.use(ErrorHandler);

module.exports = app;
