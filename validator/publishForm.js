const { body } = require("express-validator");
const { fileValidator,  } = require("../middleware/validate");


const publishForm = [
    body("title")
        .notEmpty().withMessage("Please provide a name title")
        .isLength({max: 50}).withMessage("Title must be at most 50 characters")
        .custom(fileValidator).withMessage("Only images files are allowed"),
    body("description")
        .notEmpty().withMessage("Please provide a description")
        .isLength({max: 500}).withMessage("Field must be at most 500 characters"),
    body("price")
        .notEmpty().withMessage("Price Missing")
        .isFloat({gt: 0, max: 500}).withMessage("Price must be greater than 0 and not exceed 500"),
    body("brand").notEmpty().withMessage("Brand Missing"),
    body("size").notEmpty().withMessage("size Missing"),
    body("condition").notEmpty().withMessage("condition Missing"),
    body("color").notEmpty().withMessage("color Missing"),
    body("city").notEmpty().withMessage("city Missing"), 
]    


module.exports = publishForm;