FROM node:12

WORKDIR currencyExchange

COPY package* .

RUN npm install

EXPOSE 8000

COPY *.js .
COPY *.wsdl .

ENTRYPOINT [ "npm", "start" ]