const RabbitFacade = require('./rabbitFacade')

class BankJesper {
    bankName = "BankJesper";


    quickLoan(amount) {
        return amount * 0.001;
    }

    mortgageLoans(amount) {
        return amount * 0.00001;
    }

    studentLoans(amount) {
        return amount * 0.0001;
    }

    start() {
        const rb = new RabbitFacade();

        rb.subscribe("loanRequest", (body) => {

            console.log(body)

            let interestRate = "unknown";

            if(body.type == "quick"){
                interestRate = this.quickLoan(body.amount)
            }else if(body.type == "mortgage"){
                interestRate = this.mortgageLoans(body.amount)
            }else if(body.type == "student"){
                interestRate = this.studentLoans(body.amount)
            }


            const res = {
                uid: body.uid,
                interest: interestRate,
                initialPayment: 1000,
                bankName: this.bankName,

            }
            console.log(res)

            rb.send(body.responseChannel, res)
        })
      
    }

}

module.exports = BankJesper;