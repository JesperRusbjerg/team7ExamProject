# DueBank
By Michael Due

## Specs
- Language: Python (v3.8.3 - Conda)
- MOM: RabbitMQ

## Requirements
- Must connect to proxy using MOM.
- Retrieve request from a channel
- Send reponse to another channel
- Must have three types of loans
  - Quick
  - Student
  - Mortgage

### Request

#### Format:
```json
{
    "type": "",
    "amount": 0,
    "creditScore": 0,
    "uid": "",
    "responseChannel": "loanResponse"
}
```

#### Explanation:
```
type: specifies type of loan ["quick", "student", "mortgage"]
amount: what the customer want to loan
creditScore: customer credit score between 1 - 100
uid: unique identifier
responseChannel: channel to send response ("loanResponse")
```

### Reponse

#### Format:
```json
{
    "uid": "",
    "interest": 0.0,
    "initialPayment": 0,
    "bankName": "DueBank"
}
```

#### Explanation:
```
uid: unique identifier
interest: yearly interest in procentage
initialPayment: what the customer want to loan
bankName: name of the bank ("DueBank")
```

## Setup

### Local
Run the lines step by step:

1. `python main.py` - To start DueBank
   1. `python main.py > requests.log` - To start DueBank that writes to a log file

Rest is only for testig

2.  `python receive.py` - To start DueBank
    1. `python receive.py > responses.log` - To start DueBank that writes to a log file
3. `python emit.py` - To emit a test call

### Server
