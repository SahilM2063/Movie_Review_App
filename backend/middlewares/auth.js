const User = require("../models/userModel.js")
const { sendError } = require("../utils/helper.js")
const jwt = require("jsonwebtoken")

exports.isAuth = async (req, res, next) => {
    const token = req.headers?.authorization;

    const jwtToken = token.split("Bearer ")[1];

    if (!jwtToken) return sendError(res, "Invalid token");
    const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const { userId } = decode;

    const user = await User.findById(userId);
    if (!user) return sendError(res, "Invalid token, User not found", 404);

    req.user = user

    next();
}