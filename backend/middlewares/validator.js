const { check, validationResult } = require("express-validator")
const genres = require("../utils/genres.js")
const { isValidObjectId } = require("mongoose")



exports.userValidations = [
    check("name").trim().not().isEmpty().withMessage("Name is missing."),
    check("email").normalizeEmail().isEmail().withMessage("Email is missing"),
    check("password").trim().not().isEmpty().withMessage("Password is missing.").isLength({ min: 8, max: 20 }).withMessage("Password must be 8 to 20 characters long!")
]

exports.validatePassword = [
    check("newPassword").trim().not().isEmpty().withMessage("Password is missing.").isLength({ min: 8, max: 20 }).withMessage("Password must be 8 to 20 characters long!")
]

exports.signInValidator = [
    check("email").normalizeEmail().isEmail().withMessage("Email is missing"),
    check("password").trim().not().isEmpty().withMessage("Password is missing.")
]

exports.actorInfoValidator = [
    check("name").trim().not().isEmpty().withMessage("Actor name is missing."),
    check("about").trim().not().isEmpty().withMessage("About is required field."),
    check("gender").trim().not().isEmpty().withMessage("Gender is required.."),
]


exports.validateMovie = [

    check('title').trim().not().isEmpty().withMessage("Movie title is missing"),
    check('storyLine').trim().not().isEmpty().withMessage("StoryLine is missing"),
    check('releaseDate').isDate().withMessage("releaseDate is missing"),
    check('language').trim().not().isEmpty().withMessage("language is missing"),
    check('status').isIn(['public', 'private']).withMessage("Movie status must be public or private"),
    check('type').trim().not().isEmpty().withMessage("Movie type is missing"),
    check('genres').isArray().withMessage("Genres must be an array of strings").custom((genre) => {
        for (let g of genre) {
            if (!genres.includes(g)) {
                throw Error('Invalid genre');
            }
        }
        return true;
    }),

    check('tags').isArray({ min: 1 }).withMessage("Tags must be an array of strings").custom((tags) => {
        for (let t of tags) {
            if (typeof t !== 'string') throw Error("Invalid tags")
            return true;
        }
    }),
    check('cast').isArray().withMessage("Cast must be an array of objects").custom((cast) => {
        for (let c of cast) {
            if (!isValidObjectId(c.actor)) throw Error('Invalid cast id');
            if (!c.roleAs?.trim()) throw Error('roleAs missing in cast');
            if (typeof c.leadActor !== 'boolean') throw Error('Only accepted boolean value inside leadActor inside cast');
            return true;
        }

    }),
    check('trailer').isObject().withMessage("Trailer must be an object with url and public_id").custom(({ url, public_id }) => {
        try {
            const res = new URL(url);
            if (!res.protocol.includes('http')) throw Error('Trailer url is invalid');

            const arr = url.split('/')
            const publicId = arr[arr.length - 1].split('.')[0];

            if (public_id !== publicId) throw Error('Trailer public_id is invalid!');

            return true;
        } catch (error) {
            throw Error('Trailer url is invalid')
        }
    }),
    check('poster').custom((_, { req }) => {
        if (!req.file || typeof req.file !== 'object') throw Error("Poster file is missing")

        return true
    })
]

exports.validate = (req, res, next) => {

    const errors = validationResult(req).array();
    if (errors.length) {
        return res.json({ errors: errors[0].msg })
    }

    next();
}

