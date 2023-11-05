const express = require("express");
const createUser = require("../controllers/userController");

const router = express.Router();


router.get("/create-user", createUser);


module.exports = router;