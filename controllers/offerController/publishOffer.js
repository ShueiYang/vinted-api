const Offer = require("../../models/Offer");
const { uploadOfferPicture } = require("../../services/cloudinary")


async function publishOffer(req, res) {
    try {
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

        if (!req.files) {
            throw { status: 400, message: "Picture file is required" };
        }
        const picture = req.files.picture;
        const newOffer = new Offer({
            product_name: title,
            product_description: description,
            product_price: price,
            product_details: [
                {
                    MARQUE: brand
                },
                {
                    TAILLE: size
                },
                {
                    ETAT: condition
                },
                {
                    COULEUR: color
                },
                {
                    EMPLACEMENT: city
                },
            ],
            owner: req.user,
        });
       
        const userId = req.user._id      
        if (!Array.isArray(picture)) {
            const result = await uploadOfferPicture(picture, userId, newOffer._id);
            newOffer.product_image = result;
            newOffer.product_pictures.push(result);
        } else {
            for (let i = 0; i < picture.length; i++) {
                if (i === 0) {
                    const result = await uploadOfferPicture(picture[i], userId, newOffer._id);
                    newOffer.product_image = result;
                    newOffer.product_pictures.push(result);
                } else {
                    const result = await uploadOfferPicture(picture[i], userId, newOffer._id, i);
                    newOffer.product_pictures.push(result);
                }
            }
        }
        await newOffer.save();
        const offerToPublish = newOffer.toJSON();
        delete offerToPublish.__v;
        res.status(201).json(offerToPublish);

    } catch (err) {
        console.error(err);
        if(err.http_code === 401) {
            return res.status(500).json({message: "Internal Service Error: Invalid key"})
        }
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}

module.exports = publishOffer;