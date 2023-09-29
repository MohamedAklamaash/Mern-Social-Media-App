const mongoose = require("mongoose");
const bcrpypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      min: 3,
      max: 30,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 3,
      max: 30,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: " ",
    },
    coverPricture: {
      type: String,
      default: " ",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc:{
        type:String,
        max:100
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationShip:{
        type:Number,
        enum:[1,2,3],
    }
  },
  {
    timestamps: true,//
  }
);

userSchema.pre("save",async function(next){
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrpypt.genSalt(10);
    this.password = await bcrpypt.hash(this.password,salt);
})


module.exports = mongoose.model("users", userSchema);
