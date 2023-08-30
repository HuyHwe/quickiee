const {S3, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
require("dotenv").config();
const fs = require("fs");
const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const bucketAccessKey = process.env.AWS_ACCESS_KEY;
const bucketSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
    credentials: {
        accessKeyId: bucketAccessKey,
        secretAccessKey: bucketSecretAccessKey,
    },
    region: bucketRegion
})

//upload
async function uploadToS3(file) {
    let fileNameArr = file.originalname.split(".");
    const filename = fileNameArr[0] + Date.now() + Math.floor(Math.random()*1000) + "." +fileNameArr[1];
    const uploadParams = {
        Bucket: bucketName,
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype
    }
    let command = new PutObjectCommand(uploadParams);
    await s3.send(command);
    return filename;
}


//download
function getFileS3(filename) {
    const getParams = {
        Bucket: bucketName,
        Key: filename
    }
    const command = new GetObjectCommand(getParams);
    return s3.send(command);
}


module.exports = {
    uploadToS3,
    getFileS3
}