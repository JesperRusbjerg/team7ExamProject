FROM openjdk:13

WORKDIR /logServer

COPY target/*.jar logserver.jar

COPY logs.txt logs.txt

ENTRYPOINT ["java","-jar","logserver.jar"]