const Offer = require("../../models/Offer");


async function showOffer(req, res) {
    try {
        const id = req.params.id;
        const offerFound = await Offer.findById(id).populate("owner", "account");     
        res.json(offerFound);

    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}

module.exports = showOffer;