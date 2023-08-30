const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");

// configuration step
PORT = process.env.PORT || 8080;
dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const {
    uploadToS3
} = require("./s3");

// controller
const app = express();

app.post("/image", upload.single("image"), async (req, res, next) => {
    const file = req.file;
    console.log(file);
    const result = await uploadToS3(file);
    console.log(result);
    res.send("ok");
})



app.listen(PORT, () => {
    console.log("listening to port: " + PORT);
})