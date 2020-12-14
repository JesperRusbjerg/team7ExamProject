FROM openjdk:14

WORKDIR /esb

COPY target/esb-0.0.1-SNAPSHOT.jar esb.jar

EXPOSE 8080

ENV BANK-PROXY-IP="http://bank-proxy:3000"
# ENV CREDIT-SCORE-IP=bank-proxy
# ENV EMAIL-IP=bank-proxy
# ENV LOGGING-IP=bank-proxy
ENV LOGIN-IP="login-module:3000"
# ENV STAT-IP=bank-proxy

ENTRYPOINT ["java","-jar","esb.jar"]