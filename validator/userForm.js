const { body, check } = require("express-validator");
const { fileValidator } = require("../middleware/validate");

const passwordForm = [
    body("oldPassword")
        .notEmpty().withMessage("You must defined your current password"),
    body("newPassword")
        .notEmpty().withMessage("Please enter your new password")
        .isLength({min: 8}).withMessage("Password must be at least 8 characters long"),   
]

const userForm = [
    body("username").optional(),
    check("avatar")
        .custom(fileValidator).withMessage("Only Image file are allowed"),             
    body("newsletter")
        .optional()
        .isBoolean().withMessage("newsletter must be a boolean")   
]


module.exports = {
    passwordForm,
    userForm
}