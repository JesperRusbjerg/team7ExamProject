const fetch = require('node-fetch');



const esbUrl = process.env.ESB_IP ? process.env.ESB_IP : "http://localhost:8080"


async function getAmountOfSuccLoginsUser(){
    
    const response = await fetch(esbUrl+'/get-login-logs', {
        headers: {
            "session-id": "sol"
        }
    });

    const data = await response.json();

    return data

}

async function getMostPopularMicroObject(){

    const response = await fetch(esbUrl+'/microservice-logs', {
        headers: {
            "session-id": "sol"
        }
    });
    const data = await response.json();

    return data
}

module.exports.loginData = getAmountOfSuccLoginsUser;
module.exports.microObjects = getMostPopularMicroObject;
