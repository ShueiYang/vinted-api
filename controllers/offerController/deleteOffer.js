const { deleteOfferPicture } = require("../../services/cloudinary");
const Offer = require("../../models/Offer");


async function deleteOffer(req, res) {
    try {
        const userId = req.user._id
        const offerId = req.params.id;
        await deleteOfferPicture(userId, offerId);
        await Offer.findByIdAndDelete(offerId);
        res.status(200).json({ message: "Offer succesfully deleted" });    
 
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}

module.exports = deleteOffer;