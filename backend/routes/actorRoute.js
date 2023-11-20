const express = require("express");
const { createActor } = require("../controllers/actorController");
const { uploadImage } = require("../middlewares/multer");

const actorRouter = express.Router();

actorRouter.post("/create-actor", uploadImage.single('avatar'), createActor)

module.exports = actorRouter;