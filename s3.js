const {S3, PutObjectCommand} = require('@aws-sdk/client-s3');
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
function uploadToS3(file) {
    let fileNameArr = file.originalname.split(".");

    const uploadParams = {
        Bucket: bucketName,
        Key: fileNameArr[0] + Date.now() + Math.floor(Math.random()*1000) + "." +fileNameArr[1],
        Body: file.buffer,
        ContentType: file.mimetype
    }
    let command = new PutObjectCommand(uploadParams);
    return s3.send(command);
}


//download



module.exports = {
    uploadToS3
}