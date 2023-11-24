const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const { uploadTrailer, createMovie } = require("../controllers/movieController");

const movieRouter = express.Router();

movieRouter.post('/create-movie', isAuth, isAdmin, uploadImage.single('poster'), createMovie)
movieRouter.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single('trailer'), uploadTrailer)

module.exports = movieRouter;