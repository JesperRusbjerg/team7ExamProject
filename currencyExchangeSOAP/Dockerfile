FROM node:12

WORKDIR currencyExchange

COPY package* .

RUN npm install

COPY *.js .
COPY *.wsdl .

ENTRYPOINT [ "npm", "start" ]