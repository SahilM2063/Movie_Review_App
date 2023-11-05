const User = require("../models/userModel.js")
const nodemailer = require("nodemailer")

const createUser = async (req, res) => {
    const { name, email, password } = req.body

    const fetchedUser = await User.findOne({ email });
    if (fetchedUser) return res.status(401).json({ error: "Email already exists." })

    const newUser = new User({ name, email, password });
    await newUser.save()

    // var transport = nodemailer.createTransport({
    //     host: "sandbox.smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //       user: "1c66f85c993e3c",
    //       pass: "a4feaee91ce23c"
    //     }
    //   });

    res.status(201).json({ user: newUser });
}



module.exports = createUser;