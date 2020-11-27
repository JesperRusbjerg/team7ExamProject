const RabbitFacade = require("./rabbitFacade")
const BankJesper = require("./bankJesper");


function main() {
    const jb = new BankJesper();

    jb.start();


    
    // setTimeout(function () {

    //     const rb = new RabbitFacade();

    //     // const body = {
    //     //     type: "quick",
    //     //     amount: 1000,
    //     //     creditScore: 100,
    //     //     uid: "xxxoooXOoooo",
    //     //     reponseChannel: "loanResponse"
    //     // }
    //     // console.log('davs')

    //     // rb.send("loanRequest", body);
    //     console.log("ready")

    // }, 2000);



}


main();