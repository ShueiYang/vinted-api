const { deleteAvatar, deleteAllUserOffers } = require("../../services/cloudinary");
const User = require("../../models/User");
const Offer = require("../../models/Offer");


async function deleteUser(req, res) {
    try {
        const userId = req.user._id
        const userToDelete = await User.findByIdAndDelete(userId);  
        
        if(userToDelete.account.avatar) {
            await deleteAvatar(userId);
        }
        const offers = await Offer.deleteMany({ owner: userId })
        if(offers.deletedCount !== 0) {
            await deleteAllUserOffers(userId);  
        }   
        res.status(200).json({
            message: "account succesfully deleted"
        })
        
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}

module.exports = deleteUser;