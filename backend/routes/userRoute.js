const express = require("express");
const { createUser, verifyEmail, resendEmailVerificationToken, forgetPassword, sendResetPasswordTokenStatus, resetPassword } = require("../controllers/userController");
const { userValidations, validate, validatePassword } = require("../middlewares/validator");
const { isValidPassResetToken } = require("../middlewares/user");

const userRouter = express.Router();


userRouter.post("/create", userValidations, validate, createUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/resend-email-verification-token", resendEmailVerificationToken);
userRouter.post("/forgot-password", forgetPassword);
userRouter.post("/verify-password-reset-token", isValidPassResetToken, sendResetPasswordTokenStatus);
userRouter.post("/reset-password", validatePassword, validate, isValidPassResetToken, resetPassword);

module.exports = userRouter;