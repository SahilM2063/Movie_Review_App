const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoute.js");
require("./db")

const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use("/api/user", userRouter)


app.listen(5000, () => {
    console.log("Server started on port 5000.")
})