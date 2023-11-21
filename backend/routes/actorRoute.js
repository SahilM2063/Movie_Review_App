const express = require("express");
const { createActor, updateActor, deleteActor, searchActor, getLatestActors, getSingleActor } = require("../controllers/actorController");
const { uploadImage } = require("../middlewares/multer");
const { actorInfoValidator, validate } = require("../middlewares/validator");

const actorRouter = express.Router();

actorRouter.post("/create-actor", uploadImage.single('avatar'), actorInfoValidator, validate, createActor)
actorRouter.post("/update-actor/:actorId", uploadImage.single('avatar'), actorInfoValidator, validate, updateActor);
actorRouter.delete("/:actorId", deleteActor);
actorRouter.get("/search", searchActor);
actorRouter.get("/latest-uploads", getLatestActors);
actorRouter.get("/single/:actorId", getSingleActor);


module.exports = actorRouter;