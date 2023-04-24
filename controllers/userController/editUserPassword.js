const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const User = require("../../models/User");
const sendEmail = require("../../services/nodeMailer");

// For Html form just in case...
// const html = `
//     <h1>Password changed!</h1>
//     <p>You recently changed your password!</p>
// `;

async function handlePassword(req, res) {
    try {
        const { oldPassword, newPassword } = req.body
        const userToUpdate = await User.findById(req.user._id)
       
        const userSalt = userToUpdate.salt
        const userHash = SHA256(oldPassword + userSalt).toString(encBase64)
        if (userHash !== userToUpdate.hash) {
            throw { status: 401, message: "Unauthorize: Wrong Password" }
        }
        const updatePassword = SHA256(newPassword + userSalt).toString(encBase64)
        if (updatePassword === userToUpdate.hash) {
            throw { status: 401, message: "New password must be different than the previous one" }
        }
        const newSalt = uid2(16);
        const newUpdatePassword = SHA256(newPassword + newSalt).toString(encBase64)
        userToUpdate.salt = newSalt;
        userToUpdate.hash = newUpdatePassword;
        await userToUpdate.save();
        //send Email to notify user the password is changed.
        await sendEmail(userToUpdate.email, {
            subjectTitle: "Vinted account password changed",
            message: "You recently changed your password, if it's not you you may be hacked!"
        })            
        res.json({ message: "password succesfully updated!" })

    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" })
    }
}

module.exports = handlePassword;