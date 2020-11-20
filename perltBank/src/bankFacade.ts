import { MomRequest } from './momFacade'

export interface interestAndInitialPayment {
    interest: number,
    initialPayment: number
}


export function calculateInterestAndInitialPayment(request: MomRequest): interestAndInitialPayment {
    return {
        initialPayment: 1,
        interest: 1
    }
}

