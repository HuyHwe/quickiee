const express = require("express");
const uploadRouter = express.Router();
const upload = require("../multerConfig");
const {
    uploadFileS3,
    deleteFileS3,
    uploadFilesS3,
    getFolderList
} = require("../s3");




uploadRouter.post("/", upload.array("files", 15), async (req, res, next) => {
    const files = req.files;
    try{
        if (files.length == 1) {
            let file = files[0];
            const filename = await uploadFileS3(file);
            let url = "http://localhost:8080/download/file/" + filename;
            setTimeout(() => {
                deleteFileS3(filename);
            }, 900000);
            res.send(url);
        } else {
            const foldername = await uploadFilesS3(files);
            let url = "http://localhost:8080/download/folder/" + foldername;
            const folderList = (await getFolderList(foldername)).Contents;
            folderList.forEach(file => {
                setTimeout(() => {
                    deleteFileS3(file);
                }, 900000);
            })
            res.send(url);
        }
    } catch (e) {
        next(e);
    }
    
})

module.exports = uploadRouter;