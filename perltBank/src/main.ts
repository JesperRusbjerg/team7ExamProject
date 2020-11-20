import { calculateInterestAndInitialPayment } from './bankFacade'
import { ListenForChannel, MomRequest, MomResponse, sendOnChannel } from './momFacade'


export function start() {

    ListenForChannel("loanRequest", (request: MomRequest) => {
        let interestAndPayment = calculateInterestAndInitialPayment(request);
        let momResponse: MomResponse = {
            bankName: "Bangster",
            interest: interestAndPayment.interest,
            initialPayment: interestAndPayment.initialPayment,
            uid: request.uid
        }

        sendOnChannel(request.responseChannel, momResponse);
    })

}

start();