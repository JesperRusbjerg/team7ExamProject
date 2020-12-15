FROM openjdk:13

WORKDIR /logServer

COPY target/*.jar logserver.jar

ENTRYPOINT ["java","-jar","logserver.jar"]