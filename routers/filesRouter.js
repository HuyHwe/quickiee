const express = require("express");
const filesRouter = express.Router();
const upload = require("../multerConfig");
const {
    uploadFilesS3,
    deleteFileS3,
    getFolderList
} = require("../s3");

filesRouter.post("/", upload.array("files", 15), async (req, res, next) => {
    const files = req.files;
    const foldername = await uploadFilesS3(files);
    let url = "http://localhost:8080/files/" + foldername;
    const folderList = (await getFolderList(foldername)).Contents;
    folderList.forEach(file => {
        setTimeout(() => {
            deleteFileS3(file);
        }, 900000);
    })
    res.send(url);
    
})

filesRouter.get("/:foldername", async (req, res, next) => {
    let results = [];
    const foldername = req.params.foldername;
    // try {
        const folderList = (await getFolderList(foldername)).Contents;
        console.log(folderList);
        res.send(folderList);
    // } catch (e) {
    //     next(e);
    // }
})

module.exports = filesRouter;