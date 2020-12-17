FROM node:12

WORKDIR /webserver

COPY package* .

RUN npm install

COPY src src

EXPOSE 3012

# ENV BUS_IP="http://esb:8080"

ENTRYPOINT [ "npm", "start"]