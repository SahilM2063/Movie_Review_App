const express = require("express");
const { createActor, updateActor, deleteActor } = require("../controllers/actorController");
const { uploadImage } = require("../middlewares/multer");
const { actorInfoValidator, validate } = require("../middlewares/validator");

const actorRouter = express.Router();

actorRouter.post("/create-actor", uploadImage.single('avatar'), actorInfoValidator, validate, createActor)
actorRouter.post("/update-actor/:actorId", uploadImage.single('avatar'), actorInfoValidator, validate, updateActor);
actorRouter.delete("/:actorId", deleteActor);


module.exports = actorRouter;