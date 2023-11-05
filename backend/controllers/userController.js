const createUser = (req, res) => {
    console.log(req.body)
    res.send({ user: req.body });
}


module.exports = createUser;