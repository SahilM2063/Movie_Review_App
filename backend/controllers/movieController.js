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

    if (director) {
        if (!isValidObjectId(director)) return sendError(res, "Invalid director id");
        newMovie.director = director
    }

    if (writers) {
        for (let wIds of writers) {
            if (!isValidObjectId(wIds)) return sendError(res, "Invalid writer id");
        }
        newMovie.writers = writers
    }

    // uploading movie poster
    const { secure_url, public_id, responsive_breakpoints } = await cloudinary.uploader.upload(file.path, {
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

    const finalPoster = { secure_url, public_id, responsive: [] }
    const { breakpoints } = responsive_breakpoints[0]
    if (breakpoints.length) {
        for (let imgOBJ of breakpoints) {
            const { secure_url } = imgOBJ
            finalPoster.responsive.push(secure_url)
        }
    }

    newMovie.poster = finalPoster

    await newMovie.save()

    res.status(201).json({
        id: newMovie._id,
        title,
    })
}


exports.updateMovieWithoutPoster = async (req, res) => {

    const { movieId } = req.params;

    if (!isValidObjectId(movieId)) return sendError(res, "Invalid movie id")

    const movie = await Movie.findById(movieId)

    if (!movie) return sendError(res, "Movie not found", 404)

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
        trailer,
        language
    } = req.body;

    movie.title = title
    movie.storyLine = storyLine
    movie.releaseDate = releaseDate
    movie.status = status
    movie.type = type
    movie.genres = genres
    movie.tags = tags
    movie.cast = cast
    movie.trailer = trailer
    movie.language = language

    if (director) {
        if (!isValidObjectId(director)) return sendError(res, "Invalid director id");
        movie.director = director
    }

    if (writers) {
        for (let wIds of writers) {
            if (!isValidObjectId(wIds)) return sendError(res, "Invalid writer id");
        }
        movie.writers = writers
    }

    if (req.file) {
        movie.poster = req.file.path;
    }

    await movie.save()

    res.json({ "message": "Movie updated successfully", movie })

}

exports.updateMovieWithPoster = async (req, res) => {
    const { movieId } = req.params;

    if (!isValidObjectId(movieId)) return sendError(res, "Invalid movie id")

    if (!req.file) return sendError(res, "Movie poster is missing")

    const movie = await Movie.findById(movieId)

    if (!movie) return sendError(res, "Movie not found", 404)

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
        trailer,
        language
    } = req.body;

    movie.title = title
    movie.storyLine = storyLine
    movie.releaseDate = releaseDate
    movie.status = status
    movie.type = type
    movie.genres = genres
    movie.tags = tags
    movie.cast = cast
    movie.trailer = trailer
    movie.language = language

    if (director) {
        if (!isValidObjectId(director)) return sendError(res, "Invalid director id");
        movie.director = director
    }

    if (writers) {
        for (let wIds of writers) {
            if (!isValidObjectId(wIds)) return sendError(res, "Invalid writer id");
        }
        movie.writers = writers
    }

    // adding poster
    // removing poster from cloud if already existed
    const posterId = movie.poster?.public_id
    console.log(posterId)
    if (posterId) {
        const { result } = await cloudinary.uploader.destroy(posterId, {
            folder: "Movies posters"
        })
        if (result !== 'ok') return sendError(res, "Could not update poster at moment")
    }

    // uploading movie poster
    const { secure_url, public_id, responsive_breakpoints } = await cloudinary.uploader.upload(req.file.path, {
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

    const finalPoster = { secure_url, public_id, responsive: [] }
    const { breakpoints } = responsive_breakpoints[0]
    if (breakpoints.length) {
        for (let imgOBJ of breakpoints) {
            const { secure_url } = imgOBJ
            finalPoster.responsive.push(secure_url)
        }
    }

    movie.poster = finalPoster


    await movie.save()

    res.json({ "message": "Movie updated successfully", movie })
}


exports.deleteMovie = async (req, res) => {
    const { movieId } = req.params

    if (!isValidObjectId(movieId)) return sendError(res, "Invalid movie id");

    const movie = await Movie.findById(movieId)

    if (!movie) return sendError(res, "Movie not found", 404)

    const posterId = movie.poster?.public_id
    // console.log(posterId)
    if (posterId) {
        const { result } = await cloudinary.uploader.destroy(posterId, {
            folder: "Movies posters"
        })
        // console.log(result)
        if (result !== 'ok') {
            return sendError(res, "Can not delete poster")
        }
    }

    const trailerId = movie.trailer?.public_id
    if (!trailerId) {
        return sendError(res, "could not find trailer")
    }
    // console.log(trailerId)
    const { result } = await cloudinary.uploader.destroy(trailerId, {
        // folder: "Movies trailers",
        resource_type: "video"
    })
    // console.log(result)
    if (result !== 'ok') {
        return sendError(res, "can not delete trailer")
    }

    await Movie.findByIdAndDelete(movieId);

    res.json({ message: "Movie deleted successfully" })
}