const {S3, 
    PutObjectCommand, 
    GetObjectCommand,
    DeleteObjectCommand,
    ListObjectsV2Command
} = require('@aws-sdk/client-s3');
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

// put object to s3
async function uploadFileS3(file) {
    let fileNameArr = file.originalname.split(".");
    const filename = fileNameArr[0] + Date.now() + Math.floor(Math.random()*1000) + "." +fileNameArr[1];
    const uploadParams = {
        Bucket: bucketName,
        Key: filename,
        Body: fileNameArr[1] == "zip" ? file : file.buffer,
        ContentType: file.mimetype
    }
    let command = new PutObjectCommand(uploadParams);
    await s3.send(command);
    return filename;
}

// upload multiple files
async function uploadFilesS3(arr) {
    sending = [];
    const foldername = arr[0].originalname.split(".")[0] + Date.now();
    arr.forEach(file => {
        let fileNameArr = file.originalname.split(".");
        let filename = fileNameArr[0] + Date.now() + Math.floor(Math.random()*1000) + "." +fileNameArr[1];
        const uploadParams = {
            Bucket: bucketName,
            Key: foldername + "/" + filename,
            Body: file.buffer,
            ContentType: file.mimetype
        }
        let command = new PutObjectCommand(uploadParams);
        sending.push(s3.send(command));
    });
    await Promise.all(sending);
    return foldername;
}


// get object from s3
async function getFileS3(filename) {
    const getParams = {
        Bucket: bucketName,
        Key: filename
    }
    const command = new GetObjectCommand(getParams);
    return s3.send(command);
}

// delete object from s3
function deleteFileS3(filename) {
    const deleteParams = {
        Bucket: bucketName,
        Key: filename
    }
    const command = new DeleteObjectCommand(deleteParams);
    return s3.send(command);
}

// get keys name from s3
function getFolderList(foldername) {
    const listParams = {
        Bucket: bucketName,
        Prefix: foldername
    }
    const command = new ListObjectsV2Command(listParams);
    return s3.send(command);
}

module.exports = {
    uploadFileS3,
    uploadFilesS3,
    getFileS3,
    deleteFileS3,
    getFolderList
}