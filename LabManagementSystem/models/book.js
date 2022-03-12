const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
   title : String,
   ISBN : String,
   stock : Number,
   author : String,
   description : String,
   category : String,
   maxDays: {
       type: Number,
       default: 7
   },
   maxTaken: {
        type: Number,
        default: 1
   },
   comments : [{
       type : mongoose.Schema.Types.ObjectId,
       ref : "Comment",
    }],
});

module.exports =  mongoose.model("Book", bookSchema);