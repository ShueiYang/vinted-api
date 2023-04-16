const { validationResult } = require("express-validator");

function validate (validations) {
    return async (req, res, next) => {
        for(const validation of validations) {
            const result = await validation.run(req)
            if(result.errors.length) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            next();
        } else {
            const errorMessage = errors.array()[0].msg
            res.status(400).json({message: errorMessage});
        }
    }
}


function fileValidator(value, {req}) {
    if (!req.files) {
        return true;
    }

    if (req.files.picture && Array.isArray(req.files.picture)) {
        for(let i=0; i < req.files.picture.length; i++) {
            const picture = req.files.picture[i]
            if(picture.mimetype.slice(0, 5) !== "image") {
                return false
            }         
        }
        return true;  
    } else {
        const fileKey = req.files.picture ? "picture" : "avatar" 
        const picture = req.files[fileKey] 
        if(picture.mimetype.slice(0, 5) !== "image") {
            return false;
        }
        return true; 
    }
}

module.exports = {
    validate,
    fileValidator
}
