const express = require("express");
const { createUser, verifyEmail, resendEmailVerificationToken } = require("../controllers/userController");
const { userValidations, validate } = require("../middlewares/validator");

const userRouter = express.Router();


userRouter.post("/create", userValidations, validate, createUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/resend-email-verification-token", resendEmailVerificationToken);

module.exports = userRouter;