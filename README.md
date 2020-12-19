# ExamProject for System - Integration

By Nikolai Perlt, Jesper Rusbjerg & Michael Due Pedersen
 
[Demo Video link](https://drive.google.com/file/d/1rOIWnKAVmmqhX3DwhxPGjHZBGk8JQ2KL/view?usp=sharing)

## Introduction

Our team is part of the large IT company DevOrgs. Our task has been to develop a IT solution which enables a user to send a loan request. Our service integrates with multiple banks and retrieves a response from each bank. Each bank response is presented to the user, with the option to pick the bank of the users choice.

In addition to the bank application, an administrative site was also part of the project. The administrators of the application is able to see a range of logs, statistics and user operations from a separate admin site.

## System architecture
Before we get into the flow of the program, we will take a look at the architecture of the system, a brief description of each module can be found in our "Microservices / Index" at the bottom of this text document.

![SI-ExamProject](SI-ExamProject.png)

Looking at the architecture, it is very clear that the webserver is the orchestrator, it has to contentiously call the ESB until a loan request or admin request has been fulfilled. The ESB has the purpose of executing each request from the webserver and make sure the needed microservices are requested to complete the tasks. 

The webserver calls the ESB using REST, which makes it very easy for a programmer to integrate with the ESB. As you can see on the picture, microservices and webservers are using different integration techniques, which is integrated into the ESB, if the ESB was never implemented, the programmer creating the webserver would need to understand all the mentioned technologies in order to build the webserver.

All the webservers and microservices do not call any external sources, except for the CurrencyExchange microservice. This microservice webscrapes an external monolithic service, then it slices and converts the data in order for it to be used in our application.

## Program flow

### Customer

As a customer of our site, you are able to search for a bank loan, you must fill in the following information:

- CPR
- Email address
- Loan type(Quick, student, mortgage)
- Amount
- Currency

Once this information has been provided, the system can process your loan request. Below is shown an image of the flow, created using BPMN.

![BPMN Model](searchForLoan.png)

### Administrator
As an administrator of the site you must be logged in, the administrator enters login information, and then the following happens:
- Request is sent to webserver
- Webserver sends a request to ESB
- ESB sends request to Login
- A login token or error is returned based on the result of the login

#### Retrieving statistics as administrator
Requirements: Must be logged in as administrator
- Request is sent to webserver
- Webserver sends a request to ESB
- If you are logged in, proceed to statistics module, otherwise request denied
- Statistics module requests log data from ESB
- ESB requests data from Logging module and returns it to statistics module
- Statistics calculates and returns statistics to the webportal

## Deployment

Each microservice has been deployed into one single container using docker
The docker compose file can be found here:

[docker-compose-file](https://github.com/JesperRusbjerg/team7ExamProject/blob/main/docker/docker-compose.yml)

As you may notice the Email module and the Credit score module is not to be found in this docker container as they are webservices, so they have been deployed on their own server.

 ## Reflections

 Throughout the semester, there has been focus on high cohesion within microservices, low coupling, many integration strategies, technologies and patterns. We implemented point-to-point messaging and used MOM/Message brokering in the bank part of the application, we had focus on implementing the different technologies (RPC, SOAP, REST) and focus on our architecture. In hindsight, we could have thought more about which patterns we would have wanted in the project and built some use cases for them, but overall we are very happy with how the project turned out. 

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

## Links and diagrams/models

[Draft to exam project](https://datsoftlyngby.github.io/soft2020fall/resources/3ac43cba-ExamProjectDraft.pdf)

[Brainstorm](https://github.com/JesperRusbjerg/team7ExamProject/blob/main/Brainstorm.md)

[Exam project UML diagram](https://app.lucidchart.com/lucidchart/invitations/accept/0f1c9112-dbee-416f-b531-6fe8e2ef72d5)



[BPMN Model file](https://github.com/JesperRusbjerg/team7ExamProject/blob/main/searchForLoan.bpmn)

