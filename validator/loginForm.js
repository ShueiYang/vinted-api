const { body } = require("express-validator");
const { fileValidator } = require("../middleware/validate");


const signUpForm = [
    body("username")
        .notEmpty().withMessage("Please provide a name")
        .custom(fileValidator).withMessage("Only image file are allowed"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
        .notEmpty().withMessage("Please provide a password")
        .isLength({min: 8}).withMessage("Password must be at least 8 characters long"),
    body("newsletter").isBoolean().withMessage("newsletter must be a boolean")   
]

const signInForm = [    
    body("email").notEmpty().withMessage("Please provide a email"),
    body("password").notEmpty().withMessage("Please provide a password"),    
]


module.exports = {
    signUpForm,
    signInForm
}