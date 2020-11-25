from bankSettings import bankName, exchange, interest, host
from rabbitFacade import subscribe, send
import json


def callback(ch, method, properties, body):
    request = json.loads(body.decode('utf-8'))
    loanType = request['type']
    amount = request['amount']
    creditScore = request['creditScore']
    uid = request['uid']
    responseChannel = request['responseChannel']
    processRequest(loanType, amount, creditScore, uid, responseChannel)


def processRequest(loanType, amount, creditScore, uid, responseChannel):
    printRequest(loanType, amount, creditScore, uid, responseChannel)
    calculatedInterest = calculateInterest(interest[loanType], creditScore, amount)
    response = createResponse(uid, calculatedInterest, amount, bankName)
    sendResponse(response, responseChannel)


def sendResponse(response, responseChannel):
    message = json.dumps(response, indent=4)
    send(responseChannel, message, host)


def calculateInterest(interest, creditScore, amount):
    higherAmountHigherInterest = (amount * interest * interest * interest) + 1
    calculatedInterest = (creditScore / 100) * higherAmountHigherInterest
    newInterest = interest / calculatedInterest
    return newInterest


def createResponse(uid, interest, amount, bankName):
    initialPayment = amount * interest
    printResponse(uid, interest, initialPayment, bankName)
    response = {
        'uid': uid,
        'interest': round(interest, 3),
        'initialPayment': round(initialPayment, 3),
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
    subscribe(exchange, callback, host)


if __name__ == '__main__':
    setupBank()
