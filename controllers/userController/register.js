const User = require("../../models/User");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const { uploadUserAvatar } = require("../../services/cloudinary");


async function handleRegister(req, res) {
    try {
        const { username, email, password, newsletter, checkPassword } = req.body  
     
        const emailFound = await User.findOne({email})
        if(emailFound !== null) {
            throw { status: 409, message: "Email already existed"}
        }
        if(password !== checkPassword) {
            throw { status: 418, message: "Password didnt match the teapot"}
        }
        // build the hash in order to save to DB
        const token = uid2(64);
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64)
    
        const newUser = new User({
            token,
            email,
            account: {
              username,
            },
            newsletter,
            hash,
            salt,
        })
        if(req.files) {
            const avatar = req.files.avatar
            const result = await uploadUserAvatar(avatar, newUser._id)
            newUser.account.avatar = result;
        } 
        const userSave = await newUser.save();
        res.status(201).json({
            _id: userSave._id,
            token: userSave.token,
            account: userSave.account
        })           
    } catch (err) {
        console.error(err)
        if(err.http_code === 401) {
            return res.status(500).json({message: "Internal Service Error: Invalid key"})
        }
        res.status(err.status || 500).json({ message: err.message  || "Internal Server Error"});
    }
}

module.exports = handleRegister;