FROM openjdk:14

WORKDIR /esb

COPY target/*.jar esb.jar

EXPOSE 8080

ENV CREDIT-SCORE-IP="https://www.mdp-creations.dk/creditScoreModule"
ENV EMAIL-IP="https://emailmodule20201203224626.azurewebsites.net/api/email"
ENV BANK-PROXY-IP="http://bank-proxy:3000"
ENV LOGIN-IP="login-module:3000"
ENV LOGGING-IP="rmi://logserver/LogServices"
ENV STAT-IP="http://statistics:1234"
ENV CURRENCY-IP="http://currency-exchange:8000/wsdl?wsdl"

ENTRYPOINT ["java","-jar","esb.jar"]