FROM node:12

WORKDIR /app

COPY package*.json .

RUN npm install

COPY build/ ./build

EXPOSE 3000

ENV DB_URL=mongodb://mongo:27017

CMD [ "npm", "start" ]

# docker run --name login-module -d -p 3001:3000 --network si -e DB_URL=mongodb://mongo:27017 perlt/login-module
# docker run -d --name mongo -p 27017:27017 --network si mongo
