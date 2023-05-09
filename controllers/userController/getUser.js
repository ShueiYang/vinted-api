const User = require("../../models/User");


async function getUser(req, res) {

    try {
        if(!req.headers.authorization) {
            return res.status(204).send();
        }
        const clientToken = req.headers.authorization.split(" ")[1];
        const user = await User.findOne({token: clientToken}, "account email newsletter").exec();
        if(!user) {
            throw { status: 403, message: "Forbidden User" }
        }
        res.status(200).json(user);

    } catch (err) {
        console.error(err); 
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}

module.exports = getUser;