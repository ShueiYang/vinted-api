const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const resetTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 10  // expire time 10 min
    }
})

const ResetToken = model("Reset.token", resetTokenSchema);

module.exports = ResetToken;