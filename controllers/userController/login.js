const User = require("../../models/User");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");


async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user !== null) {
            const userSalt = user.salt;
            const userHash = SHA256(password + userSalt).toString(encBase64);
            if (userHash !== user.hash) {
                throw { status: 401, message: "Wrong Email or Password" };
            }
            res.status(200).json({
                _id: user._id,
                token: user.token,
                account: user.account
            });
        } else {
            throw { status: 401, message: "Wrong Email or Password" };
        }
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}

module.exports = handleLogin;