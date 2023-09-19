const express = require("express");
const uploadRouter = express.Router();
const upload = require("../multerConfig");
const dotenv = require("dotenv");
dotenv.config();
const {
    uploadFileS3,
    deleteFileS3,
    uploadFilesS3,
    getFilesList
} = require("../s3");
const baseUrl = process.env.BASE_URL;




uploadRouter.post("/", upload.array("files", 15), async (req, res, next) => {
    const files = req.files;
    try{
        let type = files.length > 1 ? "folder" : "file";
        const name = await uploadFilesS3(files);
        const filesList = files.length > 1 ? await getFilesList(name) : [name];
        filesList.forEach(file => {
            setTimeout(() => {
                deleteFileS3(file);
            }, 900000);
        })
        res.redirect(`/upload?type=${type}&name=${name}`);
    } catch (e) {
        next(e);
    }
    
})

uploadRouter.get("/", (req, res, next) => {
    const name = req.query.name;
    const type = req.query.type;
    let url = baseUrl + "download" + "/" + type + "/" + name;
    res.render("success", {data: {
        url,

    }})
})

module.exports = uploadRouter;