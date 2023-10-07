const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    image: String,
    role: { type: String, default: "User" },

})


const userModel  = mongoose.model("User" , userSchema);
module.exports = userModel