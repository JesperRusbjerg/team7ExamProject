const fetch = require('node-fetch');

async function githubber(){
let response = await fetch('https://github.com/');
let res = await response.text();
console.log(res)
}


async function getAmountOfSuccLoginsUser(){
    
    const response = await fetch('http://localhost:8080/get-login-logs');
    const data = await response.json();

    return data

}

async function getMostPopularMicroObject(){

    const response = await fetch('http://localhost:8080/microservice-logs');
    const data = await response.json();

    return data

    
}

module.exports.loginData = getAmountOfSuccLoginsUser;
module.exports.microObjects = getMostPopularMicroObject;
