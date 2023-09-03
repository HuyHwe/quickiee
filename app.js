const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");

// configuration step
PORT = process.env.PORT || 8080;
dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const {
    uploadFileS3,
    uploadFilesS3,
    getFileS3,
    deleteFileS3
} = require("./s3");


// controller
const app = express();

app.post("/file", upload.single("file"), async (req, res, next) => {
    const file = req.file;
    const result = await uploadFileS3(file);
    let url = "http://localhost:8080/file/" + result;
    setTimeout(() => {
        deleteFileS3(result);
    }, 900000);
    res.send(url);
})

app.post("/files", upload.array("files", 15), async (req, res, next) => {
    
    const files = req.files;
    const result = await uploadFilesS3(files);
    let url = "http://localhost:8080/file/" + result;
    setTimeout(() => {
        deleteFileS3(result);
    }, 900000);
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