const { sendError } = require("../utils/helper");
const cloudinary = require("cloudinary").v2;

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

    console.log(typeof JSON.parse(req.body.trailerInfo))
    res.send("ok")
}