const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    desc:{
        type:String,
        default:""
    },
    likes:{
        type:Array,
        default:[]
    }
})

module.exports = mongoose.model("posts",postSchema);