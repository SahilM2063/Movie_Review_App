const User = require("../models/userModel.js")

const createUser = async (req, res) => {
    const { name, email, password } = req.body

    const newUser = new User({ name, email, password });
    await newUser.save()

    res.send({ user: newUser });
}



module.exports = createUser;