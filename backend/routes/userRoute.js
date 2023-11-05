const express = require("express");
const createUser = require("../controllers/userController");
const { userValidations, validate } = require("../middlewares/validator");

const userRouter = express.Router();


userRouter.post("/create", userValidations, validate, createUser);


module.exports = userRouter;