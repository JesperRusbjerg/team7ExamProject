import Rest from "./intergration/rest";
import { MomRequest } from "./logic/momFacade";
import MomHandler from "./logic/momHandler";

function start() {
    // let momRequest: MomRequest = {
    //     amount: 1000,
    //     creditScore: 1,
    //     type: "quick",
    // }

    // let mh = new MomHandler();

    // mh.start();

    // setTimeout(() => {
    //     mh.makeLoanRequest(momRequest, (responseArray) => {
    //         console.log(responseArray);
    //     })
    // }, 2000);

    let rest = new Rest();
    rest.start();


}

start();