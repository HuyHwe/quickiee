const express = require("express");
const dotenv = require("dotenv");
var mime = require('mime');
const multer = require("multer");

// configuration step
PORT = process.env.PORT || 8080;
dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const {
    uploadToS3,
    getFileS3
} = require("./s3");

// controller
const app = express();

app.post("/file", upload.single("file"), async (req, res, next) => {
    const file = req.file;
    const result = await uploadToS3(file);
    let url = "http://localhost:8080/file/" + result;
    res.send(url);
})

app.get("/file/:filename",async (req, res, next) => {
    const result = await getFileS3(req.params.filename);
    res.setHeader('Content-disposition', 'attachment; filename=' + req.params.filename);
    result.Body.pipe(res);
})


app.listen(PORT, () => {
    console.log("listening to port: " + PORT);
})