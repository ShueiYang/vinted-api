const { body, check } = require("express-validator");
const { fileValidator } = require("../middleware/validate");

const updateForm = [
    body("title")
        .isLength({max: 50}).withMessage("Title must be at most 50 characters"),
    check("picture")
        .custom(fileValidator).withMessage("Only Image file are allowed"),
    body("description")
        .isLength({max: 500}).withMessage("Field must be at most 500 characters"),
    body("price")
        .optional()
        .isFloat({gt: 0, max: 100000}).withMessage("Price must be greater than 0 and not exceed 100000"),        
]


module.exports = updateForm;