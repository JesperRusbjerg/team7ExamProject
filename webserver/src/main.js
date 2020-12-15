const express = require("express");
const axios = require("axios")


const PORT = 3012;

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
        convertBusResponseToExpressResponse(response, res);
    })

    app.post("/create-user", async (req, res) => {
        try {
            let response = await axios.post(BUS_IP + "/create-user", req.body, {
                headers: {
                    'session-id': req.header('session-id')
                }
            });
            convertBusResponseToExpressResponse(response, res);
        } catch (e) {
            convertBusResponseToExpressResponse(e.response, res);
        }
    })

    app.post("/login", async (req, res) => {
        try {
            let response = await axios.post(BUS_IP + "/login", req.body);
            convertBusResponseToExpressResponse(response, res);
        } catch (e) {
            convertBusResponseToExpressResponse(e.response, res);
        }
    })


    app.listen(PORT, () => {
        console.log("Webserver run on: " + PORT);
    })
}


function convertBusResponseToExpressResponse(response, res) {
    res.status(response.status);
    res.json({ data: response.data });
}

start();