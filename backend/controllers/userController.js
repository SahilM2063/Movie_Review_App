const User = require("../models/userModel.js")
const nodemailer = require("nodemailer")
const EmailVerificationToken = require("../models/emailVerificationToken.js")
const { isValidObjectId } = require("mongoose")

const createUser = async (req, res) => {
    const { name, email, password } = req.body

    const fetchedUser = await User.findOne({ email });
    if (fetchedUser) return res.status(401).json({ error: "Email already exists." })

    const newUser = new User({ name, email, password });
    await newUser.save();

    // Generate 6 Digit OTP
    let OTP = "";
    for (let i = 0; i <= 5; i++) {
        const randomVal = Math.round(Math.random() * 9);
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
    });
    // sending response after sending OTP.
    res.status(201).json({ message: "Please Verify Your Email. OTP Has Been Sent To Your Email Account." });
}

// method for verify an email
const verifyEmail = async (req, res) => {
    const { userId, OTP } = req.body;


    if (!isValidObjectId(userId)) return res.json({ error: "Invalid User" });

    // checking for user in User DB
    const user = await User.findById(userId);

    if (!user) return res.json({ error: "user not found!" });

    // returning if user is already verified
    if (user.isVerified) return res.json({ error: "User is already verified" });

    // finding token from emailVerification DB
    const token = await EmailVerificationToken.findOne({ owner: userId });

    if (!token) return res.json({ error: "Token not found!" });

    // matching the token
    const isMatched = await token.compareToken(OTP);

    if (!isMatched) return res.json({ error: "Please enter a valid OTP" })

    // if token matches then setting user.verified is true and saving the user
    user.isVerified = true;
    await user.save();

    await EmailVerificationToken.findByIdAndDelete(token._id);

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
        to: user.email,
        subject: 'Welcome Email',
        html: `
        <h1>Welcome to our app. Thanks for choosing us.</h1>
        `
    })


    res.json({ message: "Your email is verified." })
}

const resendEmailVerificationToken = async (req, res) => {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.json({ error: "User not found" });

    if (user.isVerified) return res.json({ error: "Email is already verified" });

    const alreadyHasToken = await EmailVerificationToken.findOne({ owner: userId });
    if (alreadyHasToken) return res.json({ error: "Only after one hour , you can request for new OTP." });

    // Generate 6 Digit OTP
    let OTP = "";
    for (let i = 0; i <= 5; i++) {
        const randomVal = Math.round(Math.random() * 9);
        OTP += randomVal
    }
    // save OTP in db with user id
    const newEmailVerificationToken = new EmailVerificationToken({ owner: user._id, token: OTP });
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
        to: user.email,
        subject: 'Re-Email verification',
        html: `
            <h1>Re Verification OTP</h1>
            <h4>${OTP}</h4>
            `
    });

    await res.json({ message: "New OTP is sent to your registered email id." })

}
module.exports = { createUser, verifyEmail, resendEmailVerificationToken };