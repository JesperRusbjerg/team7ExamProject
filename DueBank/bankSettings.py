import os

bankName = 'DueBank'
interest = {
    'quick': 0.01,
    'student': 0.001,
    'mortgage': 0.0001
}
exchange = 'loanRequest'
host = os.getenv("BANK-PROXY-HOST", "localhost") 


