const RabbitFacade = require("./rabbitFacade")
const BankJesper = require("./bankJesper");


function main() {
    const jb = new BankJesper();

    jb.start();


}


main();