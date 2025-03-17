const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    email_id: {
        type:String,
        required:true
    },
    otp: {
        type:String,
        default:null
    },
    otpExpires:{
        type:Date,
        default:null
    },
    profile_pic:{
        type:String,
        default:"default.jpg"
    }
},{timestamps:true});

const User = mongoose.model("users",userSchema);

module.exports = User;