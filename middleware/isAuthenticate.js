const User = require("../models/User");


async function isAuthenticated (req, res, next) {   
    try {
        if(!req.headers.authorization) {
            return res.status(401).json({message: "Access denied"})
        }
        const reqToken = req.headers.authorization.split(" ")[1];
        const user = await User.findOne({token: reqToken}, "account").exec();
        if(!user) {
            return res.status(401).json({message: "Access denied"}) 
        }
        req.user = user
        next();      
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

module.exports = isAuthenticated;