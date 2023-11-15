const express = require("express");
require("express-async-errors"); // for handling async errors
const morgan = require("morgan");
require("dotenv").config();
const userRouter = require("./routes/userRoute.js");
const { errorHandler } = require("./middlewares/errorHandler.js");
require("./db")
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use("/api/user", userRouter)


// error handler middleware
app.use(errorHandler)



app.listen(5000, () => {
    console.log("Server started on port 5000.")
})