const nodemailer = require('nodemailer');

async function sendMail(email,otp) {
    try {
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user:process.env.GMAIL_ID,
                pass:process.env.GMAIL_PASS
            },
        })
        let mailOptions = {
            from:`Whatsapp clone ${process.env.GMAIL_ID}`,
            to:email,
            subject:"Your OTP for logging in",
            text:`your otp for logging in is ${otp}`,
            html:`<p>your otp for logging in is ${otp}</p>` 
        }
        let info = await transporter.sendMail(mailOptions);
        console.log(info);
        console.log("mail sent succesfully")
    }
    catch(err) {
        console.log(err);
        throw new Error("Failed to send email");
    }
}
module.exports = sendMail;