const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type : String,
        unique: [ true, "Username already taken"],
        required: [ true, "Username is required"]
    },
    email: {
        type: String,
        unique : [true, "Account already exists with this email address"],
        required: [ true, "Email is required"]
    },
    password: {
        type : String,
        required : [true, "Password is required"]
    }
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel