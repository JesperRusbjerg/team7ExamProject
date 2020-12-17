Demo 

- 



# ExamProject for System - Integration

By Nikolai Perlt, Jesper Rusbjerg & Michael Due Pedersen

## Introduction

Our team is part of the large IT company DevOrgs. Our task has been to develop a IT solution that enables a user to send a loan request. Our service intergrates with multiple banks and retrives a response from each bank. Each bank response is presented to the user, with the option to pick the bank of the users choice.

In addition to the bank application, a administrative site was also part of the project. The administrators of the application is able to see a range of logs, statistics and user oprations from a seperate admin site.

## Links and diagrams/models

[Draft to exam project](https://datsoftlyngby.github.io/soft2020fall/resources/3ac43cba-ExamProjectDraft.pdf)

[Brainstorm](https://github.com/JesperRusbjerg/team7ExamProject/blob/main/Brainstorm.md)

[Exam project UML diagram](https://app.lucidchart.com/lucidchart/invitations/accept/0f1c9112-dbee-416f-b531-6fe8e2ef72d5)

![SI-ExamProject](SI-ExamProject.png)

[BPMN Model file](https://github.com/JesperRusbjerg/team7ExamProject/blob/main/searchForLoan.bpmn)

![BPMN Model](searchForLoan.png)

## Program flow
 [TODO Read](https://datsoftlyngby.github.io/soft2020fall/resources/4fc67f30-SI2020ExamProject.pdf): 
  EIP (Enterprist intergration patterens)
  EM (Enterprise messaging)
  ES (Event streaming)


## Microservices / Index

### [PerltBank](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/perltBank)

- **Language**: TypeScript
- **Integration**: RabbitMQ (MOM)
- **Architecture Type**: Microservice
- **Deployment**: Docker
- **Description**: This module subscribes to the bank proxy, and broadcasts its answer acroding to the loan request.

### [JesperBank](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/jesperBank)

- **Language**: NodeJS
- **Integration**: RabbitMQ (MOM)
- **Architecture Type**: Microservice
- **Deployment**: Docker
- **Description**: This module subscribes to the bank proxy, and broadcasts its answer acroding to the loan request.

### [DueBank](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/DueBank)

- **Language**: Python
- **Integration**: RabbitMQ (MOM)
- **Architecture Type**: Microservice
- **Deployment**: Docker
- **Description**: This module subscribes to the bank proxy, and broadcasts its answer acroding to the loan request.

### [CurrencyExchange](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/currencyExchangeSOAP)

- **Language**: NodeJS
- **Integration**: SOAP
- **Dependencies**: [Cheerio](https://www.npmjs.com/package/cheerio)
- **Architecture Type**: Microservice
- **Deployment**: Docker
- **Description**: This module intergrates with a monolithic application through webscraping, to retrive the currency exchange rate between USD and DKK.

### [BankProxy](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/bankProxy)

- **Language**: TypeScript
- **Integration**: REST
- **Architecture Type**: Microservice
- **Deployment**: Docker
- **Description**: This module brodcasts the given loan request to the banks subscribed to our system, and hereafter collect the answers to return.

### [CreditScoreService](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/CreditScoreModule)

- **Language**: Java
- **Integration**: REST
- **Architecture Type**: Webserver
- **[Deployment](https://www.mdp-creations.dk/creditScoreModule/)**: Docker(Tomcat)
- **Additional**: CI / CD pipeline with Travis CI. This service has documented endpoints at the base url.
- **Description**: This service given a CPR number calculates a creditscore and returns a number between 1 and 100.

### [Statistics](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/statisticsRest)

- **Language**: NodeJS
- **Integration**: REST
- **Architecture Type**: Microservice
- **Deployment**: Docker
- **Description**: Retrives the system logs from our LoggingModule, and calculates some defined statistics.

### [MailService](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/EmailModule)

- **Language**: C#
- **Integration**: REST
- **Architecture Type**: Webserver
- **[Deployment](https://emailmodule20201203224626.azurewebsites.net/api/email)**: Azure / Docker
- **Description**: This service can send out emails by a list of recervies, subject, and body.

### [Logging](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/logsRpc)

- **Language**: Java
- **Integration**: RPC
- **Dependencies**: TODO: insert here
- **Architecture Type**: Microservice
- **Deployment**: Docker
- **Description**: Can log system behavior based on predefined keywords.

### [Login](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/login-module)

- **Language**: TypeScript
- **Integration**: Custom application protocol
- **Architecture Type**: Microservice
- **Deployment**: Docker
- **Additional**: Has a java intergraion client
- **Description**: This module handles all user creation, and user verifications, based on username and password.

### [Webserver](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/webserver)

- **Language**: NodeJS
- **Integration**: REST
- **Architecture Type**: Web server
- **Deployment**: Docker
- **Description**: This is the webserver the our frontend sends its requests to.

### [ESB](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/esb)

- **Language**: Java
- **Integration**: REST
- **Dependencies**: LoginModuleClient
- **Architecture Type**: Microservice
- **Deployment**: Docker
- **Description**: This module serves as a Enterprise Service Bus(ESB) to our system.

### [CustomerApplication](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/customerApplication)

- **Language**: Javascript
- **Integration**: Browser
- **Dependencies**: React, Ant.design
- **Architecture Type**: Frontend
- **[Deployment](http://mdp-creations.surge.sh/)**: Surge
- **Additional**: The backend needs to run on your localhost
- **Description**: This frontend connect to our webserver, and allows a customer to search for loans of different types. When a respond is found the resulsts are presented on the site and send in a mail to the customer.

### [AdminstratorApplication](https://github.com/JesperRusbjerg/team7ExamProject/tree/main/adminstration-application)

- **Language**: Javascript
- **Integration**: Browser
- **Dependencies**: Vue, Vuetify
- **Architecture Type**: Frontend
- **[Deployment](https://team7-adminstrator.netlify.app/)**: Netlify
- **Additional**: The backend needs to run on your localhost
- **Description**: This is the administrator frontend. This allows the to get statistics on system behavior, latest logs, and user CRUD operations.
