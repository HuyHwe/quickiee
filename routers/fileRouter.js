const express = require("express");
const fileRouter = express.Router();
const upload = require("../multerConfig");
const {
    uploadFileS3,
    getFileS3,
    deleteFileS3,
} = require("../s3");



fileRouter.post("/", upload.single("file"), async (req, res, next) => {
    const file = req.file;
    const filename = await uploadFileS3(file);
    let url = "http://localhost:8080/file/" + filename;
    setTimeout(() => {
        deleteFileS3(filename);
    }, 900000);
    res.send(url);
})

fileRouter.get("/:filename",async (req, res, next) => {
    try {
        console.log(req.params.filename);
        const result = await getFileS3(req.params.filename);
        res.setHeader('Content-disposition', 'attachment; filename=' + req.params.filename);
        result.Body.pipe(res);
    } catch (e) {
        next(e);
    }
});

fileRouter.get("/:foldername/:filename",async (req, res, next) => {
    try {
        console.log(req.params.filename);
        const result = await getFileS3(req.params.foldername + "/" + req.params.filename);
        res.setHeader('Content-disposition', 'attachment; filename=' + req.params.filename);
        result.Body.pipe(res);
    } catch (e) {
        next(e);
    }
});

module.exports = fileRouter;