const express = require("express");
const { createActor, updateActor, deleteActor, searchActor, getLatestActors, getSingleActor } = require("../controllers/actorController");
const { uploadImage } = require("../middlewares/multer");
const { actorInfoValidator, validate } = require("../middlewares/validator");
const { isAuth, isAdmin } = require("../middlewares/auth");

const actorRouter = express.Router();

actorRouter.post("/create-actor", isAuth, isAdmin, uploadImage.single('avatar'), actorInfoValidator, validate, createActor)
actorRouter.post("/update-actor/:actorId", isAuth, isAdmin, uploadImage.single('avatar'), actorInfoValidator, validate, updateActor);
actorRouter.delete("/:actorId", isAuth, isAdmin, deleteActor);
actorRouter.get("/search", isAuth, isAdmin, searchActor);
actorRouter.get("/latest-uploads", isAuth, isAdmin, getLatestActors);
actorRouter.get("/single/:actorId", getSingleActor);


module.exports = actorRouter;