const User = require('../models/Users');
const express = require('express');
const {sendOtp,verifyOtp,Register} = require('../controller/auth');
const router = express.Router();
router.post("/login",sendOtp)
router.post("/login/verify-otp",verifyOtp)
router.post("/register",Register)
module.exports=router;
