const express = require("express");
const userRoute = express.Router();
const fileUpload = require("express-fileupload");

const { validate } = require("../middleware/validate");
const { signUpForm, signInForm } = require("../validator/loginForm");
const { passwordForm, userForm } = require("../validator/userForm");
const isAuthenticated = require("../middleware/isAuthenticate");

const handleRegister = require("../controllers/userController/register");
const handleLogin = require("../controllers/userController/login");
const handlePassword = require("../controllers/userController/editUserPassword");
const handleUser = require("../controllers/userController/editUser");
const deleteUser = require("../controllers/userController/deleteUser");


userRoute.post("/signup", fileUpload(), validate(signUpForm), handleRegister);

userRoute.post("/login", validate(signInForm), handleLogin);

// new route I create for this project
userRoute.put("/updateprofile", isAuthenticated, fileUpload(), validate(userForm), handleUser);

userRoute.put("/updatepassword", isAuthenticated, validate(passwordForm), handlePassword);

userRoute.delete("/deleteprofile", isAuthenticated, deleteUser);


module.exports = userRoute;