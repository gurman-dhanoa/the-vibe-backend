const Admin = require("../model/admin");
const Student = require("../model/student");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const {sendAdminToken} = require("../utils/jwtToken");
const cloudinary = require("cloudinary");

// get admins
exports.getAdmins = catchAsyncError(async (req,res,next) => {
  const admin = await Admin.find();
  res.status(200).json({
      admin
  })
});


// Create new admin
exports.createAdmin = catchAsyncError(async (req,res,next) => {
    const admin = await Admin.create(req.body);
    sendAdminToken(admin, 201, res);
});

// Login admin
exports.loginAdmin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if admin has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await admin.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendAdminToken(admin, 200, res);
});

// Logout admin
exports.logout = catchAsyncError(async (req, res, next) => {
  res.status(200).cookie("adminToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  }).json({
    success: true,
    message: "Logged Out",
  })
});

// get students
exports.getStudents = catchAsyncError(async (req,res,next) => {
  const students = await Student.find();
  res.status(200).json({
      students
  })
});

// Create new student
exports.createStudent = catchAsyncError(async (req,res,next) => {
    const {name,listening,speaking,reading,writing,overall} = req.body;
    const profileImage = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "images",
      width: 250,
      crop: "scale",
    });
    const student = await Student.create({
      name,
      listening,speaking,reading,writing,overall,
      image:{
        public_id: profileImage.public_id,
        url: profileImage.secure_url,
      }
    })

    res.status(200).json({
        student,
        success:true
    })
});

// Delete Student
exports.deleteStudent = catchAsyncError(async(req,res,next) => {
  let student = await Student.findById(req.params.id);
  
  if (!student) {
    return next(new ErrorHandler("Student not found",404));
  }

  const imageId = student.image.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await student.remove();

  res.status(200).json({
    success:true,
    message:"Student deleted successfully"
  })
  });