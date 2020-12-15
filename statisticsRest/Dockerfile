FROM node:12

WORKDIR /app

COPY package*.json .

RUN npm install

COPY src/ ./src

ENV ESB_IP='http://esb:8080'

CMD [ "npm", "start" ]