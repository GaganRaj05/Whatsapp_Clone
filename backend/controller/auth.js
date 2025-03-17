const User = require('../models/Users');
const sendMail = require("../config/sendMail");
const jsonwebtoken = require('jsonwebtoken');
async function sendOtp(req,res) {
    try {
        const phone = req.body.phone;
        const user = await User.findOne({phone_number:phone});
        if(!user) {
            return res.status(401).json("No users found, create an account");
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 5 * 60000);
        user.save();
        sendMail(user.email_id,otp);
        return res.status(201).json("Otp sent successfully")
    }
    catch(err) {
        console.log(err.message)
        return res.status(501).json("Internal server error")
    }
}
async function verifyOtp(req,res) {
    try {
        const {phone,otp} = req.body;
        const user = await User.findOne({phone_number:phone});
        if(!user) {
            return res.status(401).json("No user exists");
        }
        if(user.otp !== otp || user.otpExpires<Date.now()) {
            return res.status(401).json("Otp expired please request a new one...!")
        }
        const token = jsonwebtoken.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});

        res.cookie("jwt",token,{
            httpOnly:false,
            secure:false,
            sameSite:"lax",
            path:"/",
        });
        return res.status(201).json("Login succcessfull")
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("server error, please try again later");
    }
}
async function Register(req, res) {
    try {
        const {name, phone, mail} = req.body;
        const user = await User.findOne({phone_number:phone});
        const email_exists = await User.findOne({email_id:mail});
        if(user || email_exists) {
            return res.status(401).json("User exists check ur phone number or email id");
        }
        await User.create({
            name:name,
            phone_number:phone,
            email_id:mail
        })
        return res.status(201).json("User created successfully");
    }
    catch(err) {
        console.log(err);
        return res.status(501).json("Internal server error")
    }
}

module.exports = {
    sendOtp,
    verifyOtp,
    Register
};