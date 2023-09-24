const express = require("express");
const CookieParser = require("cookie-parser");
const ErrorHandler = require('./middleware/ErrorHandler');
const cors = require("cors");

const app = express();
const fileupload = require('express-fileupload'); 

app.use(fileupload({useTempFiles: true}))
app.use(express.json());
app.use(CookieParser());
app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with specific origins if needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Specify allowed methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Specify allowed headers
  next();
});

// importing routes
const adminRoute = require("./routes/adminRoute");
app.use("/api/v1", adminRoute);

// using middleware
app.use(ErrorHandler);

module.exports = app;
