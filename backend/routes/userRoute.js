const express = require("express");
const { createUser, verifyEmail, resendEmailVerificationToken, forgetPassword, sendResetPasswordTokenStatus, resetPassword, signIn } = require("../controllers/userController");
const { userValidations, validate, validatePassword, signInValidator } = require("../middlewares/validator");
const { isValidPassResetToken } = require("../middlewares/user");
const { isAuth } = require("../middlewares/auth");

const userRouter = express.Router();


userRouter.post("/create", userValidations, validate, createUser);
userRouter.post("/sign-in", signInValidator, validate, signIn);
userRouter.get("/is-auth", isAuth, (req, res) => {
    const { user } = req;
    res.json({ user: { id: user._id, name: user.name, email: user.email } })
});
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/resend-email-verification-token", resendEmailVerificationToken);
userRouter.post("/forgot-password", forgetPassword);
userRouter.post("/verify-password-reset-token", isValidPassResetToken, sendResetPasswordTokenStatus);
userRouter.post("/reset-password", validatePassword, validate, isValidPassResetToken, resetPassword);

module.exports = userRouter;