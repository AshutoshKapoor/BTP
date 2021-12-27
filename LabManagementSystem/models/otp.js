const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    createdAt: { type: Date, expires: 3600, default: Date.now },
    value: {
        type: String
    },
    email: {
        type: String
    }
});


module.exports = mongoose.model("Otp", otpSchema);