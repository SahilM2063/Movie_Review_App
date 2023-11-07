const nodemailer = require("nodemailer")

exports.generateOTP = (otpLength = 6) => {
    let OTP = ""
    for (let i = 1; i <= otpLength; i++) {
        const randomVal = Math.round(Math.random() * 9);
        OTP += randomVal
    }

    return OTP;
}


exports.generateMailTransporter = () => nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1c66f85c993e3c",
        pass: "a4feaee91ce23c"
    }
});