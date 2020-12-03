export default {
    // proxyUrl: "amqp://localhost"
    proxyUrl: process.env["PROXY_URL"] ? "amqp://" + process.env["PROXY_URL"] : "amqp://localhost" 
}

