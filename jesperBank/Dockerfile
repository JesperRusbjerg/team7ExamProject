FROM node:12

WORKDIR /app

COPY package*.json .

RUN npm install

COPY src/ ./src

ENV RABBIT_IP="amqp://rabbitmq"

CMD [ "npm", "start" ]