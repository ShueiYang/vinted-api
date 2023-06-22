const Offer = require("../../models/Offer");


async function getOffers(req, res) {
    try {
        const { page, limit, title, priceMin, priceMax, sort } = req.query;
        // assign to constant for documentation
        const DEFAULT_PAGE_NUMBER = 1;
        const DEFAULT_PAGE_LIMIT = 12;

        const pageLimit = Math.abs(limit) || DEFAULT_PAGE_LIMIT;
        const pageNumber = Math.abs(page) || DEFAULT_PAGE_NUMBER;
        const skip = (pageNumber - 1) * pageLimit;
        const query = {};
        const sortFilter = {};

        // regular expression match in both the title and product_details["MARQUE"] 
        if (title) {
            query.$or = [
                { product_name: new RegExp(`${title}`, "i") },
                {"product_details.MARQUE": new RegExp(`${title}`, "i")}
            ]
        }

        if (priceMin || priceMax) {
            query.product_price = {};
            if (priceMin) {
                query.product_price.$gte = Number(priceMin);
            }
            if (priceMax) {
                query.product_price.$lte = Number(priceMax);
            }
        }
        if (sort === "price-desc") {
            sortFilter.product_price = -1;
        } else if (sort === "price-asc") {
            sortFilter.product_price = 1;
        }

        const results = await Offer.find(query)
            .populate("owner", "account.username account.avatar.secure_url")
            .select(
                `owner
                product_date
                product_name 
                product_description
                product_price
                product_details
                product_image.secure_url
                product_pictures  
                `
            )
            .limit(pageLimit)
            .skip(skip)
            .sort(sortFilter);
        
        const count = await Offer.countDocuments(query);
        
        res.json({
            count,
            offers: results
        });
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}

module.exports = getOffers;