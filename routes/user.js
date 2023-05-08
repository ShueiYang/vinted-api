const express = require("express");
const userRoute = express.Router();
const fileUpload = require("express-fileupload");

const { validate } = require("../middleware/validate");
const { signUpForm, signInForm } = require("../validator/loginForm");
const { passwordForm, userForm, emailResetForm, resetPasswordForm } = require("../validator/userForm");
const isAuthenticated = require("../middleware/isAuthenticate");

const handleRegister = require("../controllers/userController/register");
const handleLogin = require("../controllers/userController/login");
const handlePassword = require("../controllers/userController/editUserPassword");
const getUser = require("../controllers/userController/getUser");
const handleUser = require("../controllers/userController/editUser");
const deleteUser = require("../controllers/userController/deleteUser");
const requestResetPassword = require("../controllers/userController/forgotPassword");
const { accessResetForm, resetPassword } = require("../controllers/userController/resetPassword");


userRoute.post("/signup", 
    fileUpload(), 
    validate(signUpForm),
    handleRegister
);

userRoute.post("/login", 
    validate(signInForm),
    handleLogin
);

// new route I create for this project

userRoute.get("/", getUser);

userRoute.put("/update", 
    isAuthenticated, 
    fileUpload(), 
    validate(userForm),
    handleUser
);

userRoute.put("/update-password",
    isAuthenticated, 
    validate(passwordForm),
    handlePassword
);

userRoute.delete("/delete",
    isAuthenticated,
    deleteUser
);

//routes for reset password

userRoute.post("/forgot-password",
    validate(emailResetForm), 
    requestResetPassword
);

userRoute.get("/reset-password/:id/:token",   // if the frontEnd need a validation to display the resetPasswordform
    accessResetForm
);

userRoute.post("/reset-password/:id/:token",
    validate(resetPasswordForm), 
    resetPassword
);


module.exports = userRoute;