const ErrorHander = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");

exports.isAuthenticatedAdmin = catchAsyncErrors(async (req, res, next) => {
  const { adminToken } = req.cookies;

  if (!adminToken) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(adminToken, process.env.JWT_SECRET);

  req.admin = await admin.findById(decodedData.id);

  next();
});