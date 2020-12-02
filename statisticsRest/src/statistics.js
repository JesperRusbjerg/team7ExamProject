const fetch = require('node-fetch');

async function githubber(){
let response = await fetch('https://github.com/');
let res = await response.text();
console.log(res)
}


async function getAmountOfSuccLoginsUser(){
    //Fetch amount of user succesfull login attempts from bus -> log module - number

    return 800

}

async function getAmountOUnSuccLoginsUser(){
    //Fetch amount of user unsuccesfull login attempts from bus -> log module - number

    return 8;
}

async function getMostPopularMicroObject(){
    //Fetch microservice data
    //Will retrieve a string that can be parsed to object

    //

    return {
        creditScore: 10,
        proxy: 14,
        email: 30,
        login: 7,
        currency: 23,
        statistics: 10
    }
}

module.exports.succes = getAmountOfSuccLoginsUser;
module.exports.unSucces = getAmountOUnSuccLoginsUser;
module.exports.microObjects = getMostPopularMicroObject;
