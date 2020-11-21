/*jslint node: true */
"use strict";

var soap = require('soap');
var express = require('express');
var fs = require('fs');
var webscraper = require('./webscraper')

let exchangeRate = 6.28;

async function updateExchangeRate(){
  let res = await webscraper.usdToDkk();
  exchangeRate = res;
  console.log(exchangeRate + "It has been updated")
}

//Update as soon as server starts, making sure we have a rate
updateExchangeRate();

setInterval(function(){ 
  updateExchangeRate() 
  console.log(exchangeRate)
//Updates once an hour if server is live
}, 3600000);


// the service

var serviceObject = {
  ExchangeService: {
    ExchangeServiceSoapPort: {

      DkToUs: function(args, callback){
        
        let exchangedValue = args.amount / exchangeRate;

        callback({
          currencyFrom: args.fromCurrency,
          currenyFromValue: args.amount,
          toCurrency: args.toCurrency,
          toCurrencyValue: exchangedValue
        })

      }
      , 
      UsToDk: function(args, callback){

        let exchangedValue = args.amount * exchangeRate;

        callback({
          currencyFrom: args.fromCurrency,
          currenyFromValue: args.amount,
          toCurrency: args.toCurrency,
          toCurrencyValue: exchangedValue
        })
      }
    }
  }

};

// load the WSDL file
var xml = fs.readFileSync('service.wsdl', 'utf8');
// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!<br /><a href="https://github.com/macogala/node-soap-example#readme">Git README</a>');
})

// Launch the server and listen
var port = 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path + "?wsdl to see if the service is working");
});