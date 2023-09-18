const express = require("express");
const downloadRouter = express.Router();
const upload = require("../multerConfig");
const {
    getFileS3,
    getFilesList
} = require("../s3");

downloadRouter.get("/file/:filename",async (req, res, next) => {
    try {
        const result = await getFileS3(req.params.filename);
        res.setHeader('Content-disposition', 'attachment; filename=' + req.params.filename);
        result.Body.pipe(res);
    } catch (e) {
        next(e);
    }
});

downloadRouter.get("/folder/:foldername/:filename",async (req, res, next) => {
    try {
        const result = await getFileS3(req.params.foldername + "/" + req.params.filename);
        res.setHeader('Content-disposition', 'attachment; filename=' + req.params.filename);
        result.Body.pipe(res);
    } catch (e) {
        next(e);
    }
});

downloadRouter.get("/folder/:foldername", async (req, res, next) => {
    let results = [];
    const foldername = req.params.foldername;
    try {
        const filesList = await getFilesList(foldername);
        res.render("download", {data: {
            filesList,
            baseUrl: "http://localhost:8080/download/folder/"
        }})
    } catch (e) {
        next(e);
    }
});

module.exports = downloadRouter;