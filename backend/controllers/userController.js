const User = require("../models/userModel.js")
const nodemailer = require("nodemailer")
const EmailVerificationToken = require("../models/emailVerificationToken.js")

const createUser = async (req, res) => {
    const { name, email, password } = req.body

    const fetchedUser = await User.findOne({ email });
    if (fetchedUser) return res.status(401).json({ error: "Email already exists." })

    const newUser = new User({ name, email, password });
    await newUser.save();

    // Generate 6 Digit OTP
    let OTP = "";
    for (let i = 0; i <= 5; i++) {
        const randomVal = Math.round(Math.random() * 10);
        OTP += randomVal
    }
    // save OTP in db with user id
    const newEmailVerificationToken = new EmailVerificationToken({ owner: newUser._id, token: OTP });
    await newEmailVerificationToken.save();

    // Send this otp to user's mail
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "1c66f85c993e3c",
            pass: "a4feaee91ce23c"
        }
    });

    transport.sendMail({
        from: 'verification@MVR.com',
        to: newUser.email,
        subject: 'Email verification',
        html: `
        <h1>Your Verification OTP</h1>
        <h4>${OTP}</h4>
        `
    })

    res.status(201).json({ message: "Please Verify Your Email. OTP Has Been Sent To Your Email Account." });
}



module.exports = createUser;