const express = require("express");
const { createUser, verifyEmail, resendEmailVerificationToken, forgetPassword, sendResetPasswordTokenStatus, resetPassword } = require("../controllers/userController");
const { userValidations, validate, validatePassword } = require("../middlewares/validator");
const { isValidPassToken } = require("../middlewares/user");

const userRouter = express.Router();


userRouter.post("/create", userValidations, validate, createUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/resend-email-verification-token", resendEmailVerificationToken);
userRouter.post("/forgot-password", forgetPassword);
userRouter.post("/verify-password-reset-token", isValidPassToken, sendResetPasswordTokenStatus);
userRouter.post("/reset-password", validatePassword, validate, isValidPassToken, resetPassword);

module.exports = userRouter;