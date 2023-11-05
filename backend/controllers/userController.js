const User = require("../models/userModel.js")

const createUser = async (req, res) => {
    const { name, email, password } = req.body

    const fetchedUser = await User.findOne({ email });
    if (fetchedUser) return res.status(401).json({ error: "Email already exists." })

    const newUser = new User({ name, email, password });
    await newUser.save()

    res.status(201).json({ user: newUser });
}



module.exports = createUser;