const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const User = require("../../models/User");
const ResetToken = require("../../models/ResetToken")


async function accessResetForm (req, res) {
    try {
        const { id, token } = req.params  
        const tokenFound = await ResetToken.findOne({token}).exec();
       
        if(tokenFound && tokenFound.userId.equals(id)) {
            return res.status(200).json({message: "resetLink is valid"})
        } else {
            throw { status: 401, message: "Invalid link or token already being used or expired" }
        }
        
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" })
    }
}



async function resetPassword (req, res) {
    try {
        const { id, token } = req.params 
        const { password, confirmPassword } = req.body

        if(password !== confirmPassword) {
            throw { status: 400, message: "Password do not match" }
        }
        const tokenFound = await ResetToken.findOne({token}).exec();
        
        if(tokenFound && tokenFound.userId.equals(id)) {
            const newToken = uid2(64);
            const newSalt = uid2(16);
            const newHash = SHA256(password + newSalt).toString(encBase64);
            
            await User.findByIdAndUpdate(id, {
                token: newToken,
                hash: newHash,
                salt: newSalt,
            })
            await ResetToken.deleteOne({token})
            res.status(200).json({ message: "Password successfully updated"})
        
        } else {
            throw { status: 403, message: "Invalid token already being used or expired" }
        }
    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" })
    }
}


module.exports = {
    accessResetForm,
    resetPassword
}