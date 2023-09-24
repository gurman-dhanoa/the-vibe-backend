const express = require("express");
const { loginAdmin, logout, createAdmin, createStudent, deleteStudent, getAdmins, getStudents } = require("../controller/adminController");
const Router = express.Router();

// Login Logout and register
Router.route("/admin/login").post(loginAdmin);
Router.route("/admin/logout").put(logout);
Router.route("/admin/new").post(createAdmin);
Router.route("/admin/new/student").post(createStudent);
Router.route("/admin/delete/student/:id").put(deleteStudent);
Router.route("/getAdmins").get(getAdmins);
Router.route("/getStudents").get(getStudents);


module.exports = Router;