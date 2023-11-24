const multer = require("multer");

const storage = multer.diskStorage({});

const ImageFileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
        cb("supports only image file!", false)
    }
    console.log(file)
    cb(null, true);
};

const VideoFileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('video')) {
        cb("supports only image file!", false)
    }
    console.log(file)
    cb(null, true);
};



exports.uploadImage = multer({ storage, ImageFileFilter });
exports.uploadVideo = multer({ storage, VideoFileFilter });