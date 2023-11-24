const express = require("express");
require("express-async-errors"); // for handling async errors
const morgan = require("morgan");
require("dotenv").config();
const userRouter = require("./routes/userRoute.js");
const { errorHandler } = require("./middlewares/errorHandler.js");
require("./db")
const cors = require("cors");
const { handleNotFound } = require("./utils/helper.js");
const actorRouter = require("./routes/actorRoute.js");
const movieRouter = require("./routes/movieRoute.js");

const app = express();
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use("/api/user", userRouter)
app.use("/api/actor", actorRouter)
app.use("/api/movie", movieRouter)

app.use("/*", handleNotFound)

// error handler middleware
app.use(errorHandler)



app.listen(5000, () => {
    console.log("Server started on port 5000.")
})