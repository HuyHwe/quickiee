const express = require("express");
const app = express();
PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("listening to port: " + PORT);
})