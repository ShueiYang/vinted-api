const User = require("../../models/User");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");


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
        userToUpdate.hash = updatePassword
        await userToUpdate.save();
        res.json({ message: "password succesfully updated!" })

    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" })
    }
}

module.exports = handlePassword;