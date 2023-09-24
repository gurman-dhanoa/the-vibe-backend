// Create Token and saving in cookie

exports.sendAdminToken = (admin, statusCode, res) => {
  const token = admin.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("adminToken", token, options).json({
    success: true,
    admin,
    token,
  });
};