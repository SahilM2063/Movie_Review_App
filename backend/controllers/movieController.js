const { sendError } = require("../utils/helper");
const cloudinary = require("cloudinary").v2;
const Movie = require(".././models/movieModel.js");
const { isValidObjectId } = require("mongoose");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});

exports.uploadTrailer = async (req, res) => {

    const { file } = req;
    if (!file) return sendError(res, "Video file is missing");

    const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
        folder: "Movies trailers",
        resource_type: "video"
    })
    res.status(201).json({ secure_url, public_id })
}

exports.createMovie = async (req, res) => {
    const { file, body } = req;
    const {
        title,
        storyLine,
        director,
        releaseDate,
        status,
        type,
        genres,
        tags,
        cast,
        writers,
        poster,
        trailer,
        language
    } = body;

    const newMovie = new Movie({
        title,
        storyLine,
        releaseDate,
        status,
        type,
        genres,
        tags,
        cast,
        trailer,
        language
    });

    // if (director) {
    //     if (!isValidObjectId(director)) return sendError(res, "Invalid director id");
    //     newMovie.director = director
    // }

    // if (writers) {
    //     for (let wIds of writers) {
    //         if (!isValidObjectId(wIds)) return sendError(res, "Invalid writer id");
    //     }
    //     newMovie.writers = writers
    // }

    // uploading movie poster
    const cloudRes = await cloudinary.uploader.upload(file.path, {
        folder: "Movies posters",
        transformation: {
            width: 1280,
            height: 720
        },
        responsive_breakpoints: {
            create_derived: true,
            max_width: 640,
            max_images: 3,

        }
    });

    console.log(cloudRes)
    console.log(cloudRes.responsive_breakpoints[0].breakpoints)

    console.log(typeof JSON.parse(req.body.trailerInfo))
    res.send("ok")
}