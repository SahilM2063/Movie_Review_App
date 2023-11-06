const express = require("express");
const { createUser, verifyEmail } = require("../controllers/userController");
const { userValidations, validate } = require("../middlewares/validator");

const userRouter = express.Router();


userRouter.post("/create", userValidations, validate, createUser);
userRouter.post("/verify-email", verifyEmail);

module.exports = userRouter;