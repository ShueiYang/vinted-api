const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
      },
    account: {
        username: String,
        avatar: Object,
    },
    newsletter: Boolean,
    hash: {
        type: String,
        required: true
    },
    salt: String,
})

const User = model("User", userSchema)

module.exports = User;