const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI, ({ dbName: "MVR_DB" })).then(() => {
    console.log("Database connected.")
}).catch((err) => {
    console.log("Failed to connect : ", err)
});