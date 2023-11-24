const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo } = require("../middlewares/multer");
const { uploadTrailer } = require("../controllers/movieController");

const movieRouter = express.Router();

movieRouter.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single('trailer'), uploadTrailer)

module.exports = movieRouter;