const express = require("express");
const router = require("./routes/userRoute");

const app = express();
app.use("/api", router)


app.listen(5000, () => {
    console.log("Server started on port 5000.")
})