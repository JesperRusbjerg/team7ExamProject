import { MomRequest } from './momFacade'

export interface interestAndInitialPayment {
    interest: number,
    initialPayment: number
}


export function calculateInterestAndInitialPayment(request: MomRequest): interestAndInitialPayment {
    let initialPayment = request.amount * (request.creditScore / 100);
    let interest = (request.creditScore / 2) / 100;

    return {
        initialPayment,
        interest
    }
}

