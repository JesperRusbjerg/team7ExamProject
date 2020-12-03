FROM node:12

WORKDIR /app

COPY package*.json .

RUN npm install

COPY build/ ./build

ENV REST_PORT=3000
ENV RABBIT_URL=rabbitmq

EXPOSE 3000

CMD [ "npm", "start" ]


# docker run --name bank-proxy -d --network si -p 3000:3000 bank-proxy