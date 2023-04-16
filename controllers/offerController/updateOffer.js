const Offer = require("../../models/Offer");
const { updateOfferPicture } = require("../../services/cloudinary")


async function updateOffer(req, res) {
    try {
        const id = req.params.id;
        const {
            title, 
            description, 
            price, 
            brand,
            size, 
            condition, 
            color,
            city
        } = req.body;

        const offerFound = await Offer.findById(id);

        if (req.files) {
            const prevPicture = offerFound.product_image.public_id;
            const picture = req.files.picture;
            const result = await updateOfferPicture(prevPicture, picture, req.user._id, offerFound._id);
            offerFound.product_image = result;
            offerFound.product_pictures[0] = result;
        }

        if (title) {
            offerFound.product_name = title;
        }
        if (description) {
            offerFound.product_description = description;
        }
        if (price) {
            offerFound.product_price = price;
        }
        offerFound.product_details.forEach(detail => {
            const key = Object.keys(detail)[0];
            switch (key) {
                case "MARQUE":
                    if (brand) {
                        detail[key] = brand;
                    }
                    break;
                case "TAILLE":
                    if (size) {
                        detail[key] = size;
                    }
                    break;
                case "ETAT":
                    if (condition) {
                        detail[key] = condition;
                    }
                    break;
                case "COULEUR":
                    if (color) {
                        detail[key] = color;
                    }
                    break;
                case "EMPLACEMENT":
                    if (city) {
                        detail[key] = city;
                    }
                    break;
                default: // do nothing...
                    break;
            }
        });
        // can only save if we tell mongoose the doc is modified...
        offerFound.markModified("product_details");
        await offerFound.save();
        res.status(200).json({ message: "Offer succesfully updated" });
    } catch (err) {
        console.error(err);
        if(err.http_code === 401) {
            return res.status(500).json({message: "Internal Service Error: Invalid key"})
        }
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}

module.exports = updateOffer;