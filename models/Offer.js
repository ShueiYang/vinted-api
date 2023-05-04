const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const offerSchema = new Schema({
    product_name: String,
    product_description: String,
    product_price: Number,
    product_details: Array,
    product_image: Object,
    product_pictures: Array,
    product_date: { type: Date, default: Date.now },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User" 
    }
})

const Offer = model("Offer", offerSchema);

module.exports = Offer;