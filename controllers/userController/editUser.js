const User = require("../../models/User");
const { uploadUserAvatar, updateUserAvatar } = require("../../services/cloudinary");


async function handleUser(req, res) {
    try {
        const { username, newsletter } = req.body;
        const userToUpdate = await User.findById(req.user._id);

        if (req.files) {
            const newAvatar = req.files.avatar;
            if (userToUpdate.account.avatar) {
                const prevAvatar = userToUpdate.account.avatar.public_id;
                const result = await updateUserAvatar(prevAvatar, newAvatar, userToUpdate._id);
                userToUpdate.account.avatar = result;
            } else {
                const result = await uploadUserAvatar(newAvatar, userToUpdate._id);
                userToUpdate.account.avatar = result;
            }
        }
        if (username) {
            userToUpdate.account.username = username;
        }
        if (newsletter) {
            userToUpdate.newsletter = newsletter;
        }
        await userToUpdate.save();
        res.json({ message: "profile succesfully updated!" });

    } catch (err) {
        console.error(err);
        if(err.http_code === 401) {
            return res.status(500).json({message: "Internal Service Error: Invalid key"})
        }
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}


module.exports = handleUser;