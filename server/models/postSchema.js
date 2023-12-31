const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  desc: {
    type: String,
    default: "",
  },
  likes: {
    type: Array,
    default: [],
  },
  userName: {
    type: String,
    default: "",
  },
  latitude: {
    type:String,
    default:""
  },
  longitude: {
    type:String,
    default:""
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  comments:{
    userName:{
      type:String,
    },
    type:Array,
    default:[],
  }
});

module.exports = mongoose.model("posts",postSchema);