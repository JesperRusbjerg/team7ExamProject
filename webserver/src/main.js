const express = require("express");
const axios = require("axios")


const PORT = process.env.WEBSERVER_PORT || 3000;

function start(){
    const app = express();

    app.get("/getLoans", (req, res) => {
    })



    app.listen(PORT, () => {
        console.log("Webserver run on: " + PORT);
    })
}

start();