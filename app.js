const express = require("express");
const dotenv = require("dotenv");

// configuration step
PORT = process.env.PORT || 8080;
dotenv.config();
const upload = require("./multerConfig");
const fileRouter = require("./routers/fileRouter");
const filesRouter = require("./routers/filesRouter");
const app = express();
app.set("view engine", "ejs");

//load static file
app.use("/assets", express.static("public/assets"));
fileRouter.use("/assets", express.static("public/assets"));
filesRouter.use("/assets", express.static("public/assets"));

// controller
function errorHander(e, req, res, next) {
    console.log(`error: ${e.message}`);
    res.header("Content-Type", 'application/json');
    const status = e.status || 400;
    res.status(status).send(e.message)
}


app.use("/file", fileRouter);

app.use("/files", filesRouter);

app.use(errorHander);

app.listen(PORT, () => {
    console.log("listening to port: " + PORT);
})