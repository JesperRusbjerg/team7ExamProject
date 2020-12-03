FROM node:12

WORKDIR /app

COPY package*.json .

RUN npm install

COPY build/ ./build

ENV PROXY_URL=rabbitmq

CMD [ "npm", "start" ]


# docker run --name perlt-bank -d --network si perlt-bank
