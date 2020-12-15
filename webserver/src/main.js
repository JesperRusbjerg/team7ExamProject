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

        // Make sure to have currency exchange if necessary

        let response = await axios.post(BUS_IP + "/request-loan", req.body);
        response.data[0]["creditScore"] = creditScoreObject.score;
        convertBusResponseToExpressResponse(response, res);
    })

    app.post("/create-user", async (req, res) => {
        try {
            let response = await axios.post(BUS_IP + "/create-user", req.body, createSessionHeader(req));
            convertBusResponseToExpressResponse(response, res);
        } catch (e) {
            convertBusResponseToExpressResponse(e.response, res);
        }
    })

    app.post("/login", async (req, res) => {
            console.log("hi")

        try {
            let response = await axios.post(BUS_IP + "/login", req.body);
            convertBusResponseToExpressResponse(response, res);
        } catch (e) {
            convertBusResponseToExpressResponse(e.response, res);
        }
    })

    app.get("/stats-login", async (req, res) => {
        try {
            let response = await axios.get(BUS_IP + "/sucess-login"
            // ,
            // { headers: {
            //     'session-id': 'sol'
            // }}
            , createSessionHeader(req))


            convertBusResponseToExpressResponse(response, res);
        } catch (e) {
            convertBusResponseToExpressResponse(e.response, res);
        }

    })

    app.get("/stats-microservice", async (req, res) => {
        try {
            let response = await axios.get(BUS_IP + "/micro-distribution-percent"
            // ,
            // { headers: {
            //     'session-id': 'sol'
            // }}
            , createSessionHeader(req))

            convertBusResponseToExpressResponse(response, res);
        } catch (e) {
            convertBusResponseToExpressResponse(e.response, res);
        }

    })

    app.get("/recent-logs", async (req, res) => {

        try {
            let response = await axios.get(BUS_IP + "/ten-last-logs"
            // ,
            // { headers: {
            //     'session-id': 'sol'
            // }}
            , createSessionHeader(req))

            convertBusResponseToExpressResponse(response, res);
        } catch (e) {
            convertBusResponseToExpressResponse(e.response, res);
        }

    })

   


    app.listen(PORT, () => {
        console.log("Webserver run on: " + PORT);
    })
}

function createSessionHeader(req) {
    return {
        headers: {
            'session-id': req.header('session-id')
        }
    }
}

function convertBusResponseToExpressResponse(response, res) {
    res.status(response.status);
    res.json({ data: response.data });
}

start();


