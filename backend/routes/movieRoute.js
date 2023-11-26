const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const { uploadTrailer, createMovie } = require("../controllers/movieController");
const { validateMovie, validate } = require("../middlewares/validator");
const { parseData } = require("../middlewares/helper");

const movieRouter = express.Router();

movieRouter.post('/create-movie', isAuth, isAdmin, uploadImage.single('poster'), parseData, validateMovie, validate, createMovie)
movieRouter.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single('trailer'), uploadTrailer)

module.exports = movieRouter;