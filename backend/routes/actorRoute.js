const express = require("express");
const { createActor } = require("../controllers/actorController");
const { uploadImage } = require("../middlewares/multer");
const { actorInfoValidator, validate } = require("../middlewares/validator");

const actorRouter = express.Router();

actorRouter.post("/create-actor", uploadImage.single('avatar'), actorInfoValidator, validate, createActor)

module.exports = actorRouter;