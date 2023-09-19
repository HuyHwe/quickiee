const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
// configuration step
PORT = process.env.PORT || 8080;

const uploadRouter = require("./routers/uploadRouter");
const downloadRouter = require("./routers/downloadRouter");
const app = express();
app.set("view engine", "ejs");

//load static file
app.use("/assets", express.static("public/assets"));
uploadRouter.use("/assets", express.static("public/assets"));
downloadRouter.use("/folder/assets", express.static("public/assets"));

// controller
function serverErrorHandler(e, req, res, next) {
    console.log(`error: ${e.message}`);
    res.header("Content-Type", 'application/json');
    const status = e.status || 400;
    res.status(status)
    res.render("error");
}

function clientErrorHandler(req, res, next) {
    res.status(404);
    res.render("error");
}

app.get("/", (req, res, next) => {
    res.render("upload");
})

app.use("/upload", uploadRouter);

app.use("/download", downloadRouter);

app.use(clientErrorHandler);

app.use(serverErrorHandler);

app.listen(PORT, () => {
    console.log("listening to port: " + PORT);
})