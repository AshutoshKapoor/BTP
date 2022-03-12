const mongoose = require("mongoose");

const fineSchema = new mongoose.Schema({
    reason : {type: String,  required: true},
    value : {type: Number, required: true},
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Fine", fineSchema);