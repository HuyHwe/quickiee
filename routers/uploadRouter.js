const express = require("express");
const uploadRouter = express.Router();
const upload = require("../multerConfig");
const {
    uploadFileS3,
    deleteFileS3,
    uploadFilesS3,
    getFilesList
} = require("../s3");




uploadRouter.post("/", upload.array("files", 15), async (req, res, next) => {
    const files = req.files;
    const name = await uploadFilesS3(files);
    let url = files.length > 1 ? "http://localhost:8080/download/folder/" + name : "http://localhost:808download/file/" + name;
    const filesList = files.length > 1 ? await getFilesList(name) : [name];
    filesList.forEach(file => {
        setTimeout(() => {
            deleteFileS3(file);
        }, 900000);
    })
    res.send(url);
})

module.exports = uploadRouter;