from bankSettings import exchange, interest, host
from rabbitFacade import subscribe
import json


def callback(ch, method, properties, body):
    request = json.loads(body.decode('utf-8'))
    uid = request['uid']
    interest = request['interest']
    initialPayment = request['initialPayment']
    bankName = request['bankName']
    printResponse(uid, interest, initialPayment, bankName)


def printResponse(uid, interest, initialPayment, bankName):
    print('##### Response ####')
    print('uid: {}'.format(uid))
    print('interest: {}'.format(interest))
    print('initialPayment: {}'.format(initialPayment))
    print('bankName: {}'.format(bankName))
    print('###################')


subscribe('loanResponse', callback, host)
