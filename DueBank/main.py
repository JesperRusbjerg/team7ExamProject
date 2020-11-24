from bankSettings import bankName, exchange, interest
from rabbitFacade import subscribe
import json


def callback(ch, method, properties, body):
    request = json.loads(body.decode('utf-8'))
    loanType = request['loanType']
    amount = request['amount']
    creditScore = request['creditScore']
    uid = request['uid']
    responseChannel = request['responseChannel']
    processRequest(loanType, amount, creditScore, uid, responseChannel)


def processRequest(loanType, amount, creditScore, uid, responseChannel):
    printRequest(loanType, amount, creditScore, uid, responseChannel)
    print(interest[loanType])
    calculatedInterest = calculateInterest(interest[loanType], creditScore)
    response = createResponse(uid, calculatedInterest, amount, bankName)
    # TODO: send response with responseChannel


def calculateInterest(interest, creditScore):
    # 95 / 100 = 0,95 <=> 20 / 100 = 0,2
    calculatedInterest = creditScore / 100
    # 0.01 / 0,95 = 0,0105 <=> 0,01 / 0,2 = 0,05
    newInterest = interest / calculatedInterest
    return newInterest


def createResponse(uid, interest, initialPayment, bankName):
    printResponse(uid, interest, initialPayment, bankName)
    response = {
        'uid': uid,
        'interest': interest,
        'initialPayment': initialPayment,
        'bankName': bankName
    }
    return response


def printRequest(loanType, amount, creditScore, uid, responseChannel):
    print('##### Request #####')
    print('LoanType: {}'.format(loanType))
    print('Amount: {}'.format(amount))
    print('CreditScore: {}'.format(creditScore))
    print('UID: {}'.format(uid))
    print('ResponseChannel: {}'.format(responseChannel))
    print('###################')


def printResponse(uid, interest, initialPayment, bankName):
    print('##### Response ####')
    print('uid: {}'.format(uid))
    print('interest: {}'.format(interest))
    print('initialPayment: {}'.format(initialPayment))
    print('bankName: {}'.format(bankName))
    print('###################')


def setupBank():
    print('Starting {}'.format(bankName))
    subscribe(exchange, callback)


if __name__ == '__main__':
    setupBank()
