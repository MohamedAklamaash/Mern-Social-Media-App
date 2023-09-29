const mongoose = require("mongoose");

const mongoConnection = async()=>{
    await mongoose.connect(
      `mongodb+srv://${process.env.mongo_admin}:${process.env.mongo_pass}@socialmediaapp.g0xvu8v.mongodb.net/SocialMediaApp?retryWrites=true&w=majority`
    ).then(()=>{
        console.log("Mongo Database is connected!");
    }).catch(()=>{
        console.log("Database is not connected");
    })
}

module.exports = mongoConnection;