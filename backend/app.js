const express = require("express");
const userRouter = require("./routes/userRoute");

const app = express();
app.use(express.json())
app.use("/api/user", userRouter)


app.listen(5000, () => {
    console.log("Server started on port 5000.")
})