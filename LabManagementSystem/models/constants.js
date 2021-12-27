const mongoose = require("mongoose");

const constantsSchema = new mongoose.Schema({
    name : {type: String, unique: true},
    value : {type: String}
});

module.exports = mongoose.model("Constants", constantsSchema);