const cloudinary = require("cloudinary").v2;
const { isValidObjectId } = require("mongoose");
const Actor = require("../models/actorModel.js");
const { sendError } = require("../utils/helper.js")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});

exports.createActor = async (req, res) => {
    const { name, about, gender } = req.body;
    const { file } = req;

    const newActor = new Actor({ name, about, gender });

    if (file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
            folder: "MVR_Actors",
            gravity: "face",
            height: 500,
            width: 500,
            crop: "thumb"
        })

        newActor.avatar = { url: secure_url, public_id }
    }

    await newActor.save();
    res.status(201).json({ id: newActor._id, name, about, gender, avatar: newActor.avatar?.url });
};


exports.updateActor = async (req, res) => {
    const { name, about, gender } = req.body;
    const { file } = req;
    const { actorId } = req.params;

    if (!isValidObjectId(actorId)) return sendError(res, "Invalid request")

    const fetchedActor = await Actor.findById(actorId);

    if (!fetchedActor) return sendError(res, "Invalid request, actor not found", 404)

    const public_id = fetchedActor.avatar?.public_id
    // console.log(public_id)

    if (public_id && file) {
        const { result } = await cloudinary.uploader.destroy(public_id, {
            folder: "MVR_Actors"
        })
        // console.log(result)
        if (result !== 'ok') {
            return sendError(res, "Could not delete image from cloud!")
        }
    }

    if (file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
            folder: "MVR_Actors",
            gravity: "face",
            height: 500,
            width: 500,
            crop: "thumb"
        });
        fetchedActor.avatar = { url: secure_url, public_id }
    }

    fetchedActor.name = name;
    fetchedActor.about = about;
    fetchedActor.gender = gender;


    await fetchedActor.save();

    res.status(201).json({
        id: fetchedActor._id,
        name,
        about,
        gender,
        avatar: fetchedActor.avatar?.url
    })
}


exports.deleteActor = async (req, res) => {
    const { actorId } = req.params

    if (!isValidObjectId(actorId)) return sendError(res, "Invalid request")
    const actor = await Actor.findById(actorId);
    if (!actor) return sendError(res, "Invalid request, No actor found", 404)

    const public_id = actor.avatar?.public_id
    if (public_id) {
        const { result } = await cloudinary.uploader.destroy(public_id, {
            folder: "MVR_Actors"
        })
        console.log(result)
        if (result !== 'ok') {
            return sendError(res, "Could not delete image from cloud!")
        }
    }

    await Actor.findByIdAndDelete(actorId)

    res.json({ message: "Actor deleted successfully" })
}

exports.searchActor = async (req, res) => {
    const { query } = req
    const result = await Actor.find({
        $text: {
            $search: `"${query.name}"`
        }
    })
    res.json(result)
}

exports.getLatestActors = async (req, res) => {
    const result = await Actor.find().sort({ createdAt: -1 }).limit(12);

    res.json(result)
}