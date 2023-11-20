const express = require("express");
const { createActor } = require("../controllers/actorController");

const actorRouter = express.Router();

actorRouter.post("/create-actor", createActor)

module.exports = actorRouter;