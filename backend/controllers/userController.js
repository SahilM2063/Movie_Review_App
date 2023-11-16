const User = require("../models/userModel.js")
const nodemailer = require("nodemailer")
const EmailVerificationToken = require("../models/emailVerificationToken.js")
const { isValidObjectId } = require("mongoose")
const { generateOTP, generateMailTransporter } = require("../utils/mail.js")
const { sendError, generateRandomBytes } = require("../utils/helper.js")
const PasswordResetToken = require("../models/passwordResetToken.js")
const userRouter = require("../routes/userRoute.js")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    const { name, email, password } = req.body

    const fetchedUser = await User.findOne({ email });
    if (fetchedUser) return sendError(res, "Email already exists.");

    const newUser = new User({ name, email, password });
    await newUser.save();

    // Generate 6 Digit OTP
    let OTP = generateOTP();
    // save OTP in db with user id
    const newEmailVerificationToken = new EmailVerificationToken({ owner: newUser._id, token: OTP });
    await newEmailVerificationToken.save();

    // Send this otp to user's mail
    const transport = generateMailTransporter();

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
    res.status(201).json(
        {
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
}

// method for verify an email
const verifyEmail = async (req, res) => {
    const { userId, OTP } = req.body;

    if (!isValidObjectId(userId)) return sendError(res, "Invalid User");

    // checking for user in User DB
    const user = await User.findById(userId);

    if (!user) return sendError(res, "User not found!", 404);

    // returning if user is already verified
    if (user.isVerified) return sendError(res, "User is already verified");

    // finding token from emailVerification DB
    const token = await EmailVerificationToken.findOne({ owner: userId });

    if (!token) return sendError(res, "Token not found!", 404);

    // matching the token
    const isMatched = await token.compareToken(OTP);

    if (!isMatched) return sendError(res, "Please enter a valid OTP");

    // if token matches then setting user.verified is true and saving the user
    user.isVerified = true;
    await user.save();

    await EmailVerificationToken.findByIdAndDelete(token._id);

    const transport = generateMailTransporter();

    transport.sendMail({
        from: 'verification@MVR.com',
        to: user.email,
        subject: 'Welcome Email',
        html: `
        <h1>Welcome to our app. Thanks for choosing us.</h1>
        `
    })

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
    res.json({ user: { id: user._id, name: user.name, email: user.email, token: jwtToken }, message: "Your email is verified." })
}

const resendEmailVerificationToken = async (req, res) => {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return sendError(res, "User not found!", 404);

    if (user.isVerified) return sendError(res, "Email is already verified");

    const alreadyHasToken = await EmailVerificationToken.findOne({ owner: userId });
    if (alreadyHasToken) return sendError(res, "Only after one hour , you can request for new OTP.");

    // Generate 6 Digit OTP
    let OTP = generateOTP();

    // save OTP in db with user id
    const newEmailVerificationToken = new EmailVerificationToken({ owner: user._id, token: OTP });
    await newEmailVerificationToken.save();

    // Send this otp to user's mail
    const transport = generateMailTransporter();

    transport.sendMail({
        from: 're-verification@MVR.com',
        to: user.email,
        subject: 'Re-Email verification',
        html: `
            <h1>Re Verification OTP</h1>
            <h4>${OTP}</h4>
            `
    });

    res.json({ message: "New OTP is sent to your registered email id." })

}

const forgetPassword = async (req, res) => {
    const { email } = req.body

    if (!email) return sendError(res, "Email is missing");

    const user = await User.findOne({ email });
    if (!user) return sendError(res, "User not found!", 404);

    const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
    if (alreadyHasToken) return sendError(res, "Only after one hour you can request for another token.");

    const token = await generateRandomBytes();
    const newPasswordResetToken = await PasswordResetToken({ owner: user._id, token });
    await newPasswordResetToken.save();

    const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

    // Send this otp to user's mail
    var transport = generateMailTransporter();

    transport.sendMail({
        from: 'security@MVR.com',
        to: user.email,
        subject: 'Reset password link',
        html: `
                <h1>Click here to reset a password</h1>
                <a href="${resetPasswordUrl}">Change password</a>
                `
    });

    res.json({ message: "link send to your email." })
}

const sendResetPasswordTokenStatus = (req, res) => {
    res.json({ valid: "true" })
}

const resetPassword = async (req, res) => {
    const { newPassword, userId } = req.body;

    const user = await User.findById(userId);
    const matched = await user.comparePassword(newPassword);
    if (matched) return sendError(res, "New password must be different from older once.");

    user.password = newPassword;
    await user.save();

    await PasswordResetToken.findByIdAndDelete(req.resetToken._id)

    const transport = generateMailTransporter();

    transport.sendMail({
        from: 'secutity@MVR.com',
        to: user.email,
        subject: 'Password Reset Successfully',
        html: `
        <h1>Password Reset Successfully</h1>
        <h4>Now you can use new password.</h4>
        `
    });

    res.json({ message: "Password reset successfully, now you can use new password" })
}

const signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return sendError(res, "Email or Password is invalid")

    const matched = await user.comparePassword(password);
    if (!matched) return sendError(res, "Email or Password is invalid");

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

    const { _id, name } = user

    res.json({ user: { id: _id, name, email, token: jwtToken } })
}

module.exports = { createUser, verifyEmail, resendEmailVerificationToken, forgetPassword, sendResetPasswordTokenStatus, resetPassword, signIn };