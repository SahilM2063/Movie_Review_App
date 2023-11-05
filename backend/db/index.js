const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6", ({ dbName: "MVR_DB" })).then(() => {
    console.log("Database connected.")
}).catch((err) => {
    console.log("Failed to connect : ", err)
});