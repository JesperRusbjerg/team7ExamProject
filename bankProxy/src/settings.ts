export default {
    LISTEN_CHANNEL: "responseChannel",
    RESPONSES_TO_WAIT_FOR: 3,
    RESPONSE_TIMEOUT_TIME: 10000,

    SEND_CHANNEL: "loanRequest",

    RABBIT_URL: process.env.RABBIT_URL ? process.env.RABBIT_URL : "localhost",  
    REST_PORT: process.env.REST_PORT ? Number(process.env.REST_PORT) : 3000,
}

// proxyUrl: process.env["NODE_ENV"] ? "amqp://" + process.env["NODE_ENV"] : "amqp://104.248.139.111"