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
    deleteFileS3,
    getFolderList
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
    if (result == null) res.send(null);
    else {
        res.setHeader('Content-disposition', 'attachment; filename=' + req.params.filename);
        result.Body.pipe(res);
    }
})

app.get("/files/:foldername", async (req, res, next) => {
    let results = [];
    const foldername = req.params.foldername;
    const folderList = (await getFolderList(foldername)).Contents;
    folderList.forEach(item => {
        results.push(getFileS3(item.Key).then(result => {
            result.Body.on('data', chunk => res.write(chunk))
        }));
    });
    await Promise.all(results);
    res.end();
    
    
})

app.listen(PORT, () => {
    console.log("listening to port: " + PORT);
})