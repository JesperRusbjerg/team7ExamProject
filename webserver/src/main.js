const express = require("express");
const axios = require("axios")


const PORT = process.env.WEBSERVER_PORT || 3009;
const BUS_IP = process.env.BUS_IP || "http://localhost:8080";


function start() {
    const app = express();
    app.use(express.json());

    app.post("/loans", async (req, res) => {
        let request = req.body;
        let creditScoreObject = await axios.get(BUS_IP + "/credit-score/" + request.cpr).then(e => e.data);
        request["creditScore"] = creditScoreObject.score

        let response = await axios.post(BUS_IP + "/request-loan", req.body);
        response.data[0]["creditScore"] = creditScoreObject.score;
        console.log(response.data);
        res.json(response.data);
    })

    app.listen(PORT, () => {
        console.log("Webserver run on: " + PORT);
    })
}

start();