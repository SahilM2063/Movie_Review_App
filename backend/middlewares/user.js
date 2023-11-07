const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/passwordResetToken.js");
const { sendError } = require("../utils/helper.js");

exports.isValidPassToken = async (req, res, next) => {
    const { userId, token } = req.body;

    if (!token.trim() || !isValidObjectId(userId)) return sendError(res, "Invalid request");

    const resetToken = await PasswordResetToken.findOne({ owner: userId });
    if (!resetToken) return sendError(res, "Unauthorized access, Invalid request", 404);

    const matched = await resetToken.compareToken(token);
    if (!matched) return sendError(res, "Unauthorized access, Invalid request", 404);

    req.resetToken = resetToken;
    next();
}