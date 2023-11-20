const { check, validationResult } = require("express-validator")



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


exports.validate = (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length) {
        return res.json({ errors: errors[0].msg })
    }

    next();
}