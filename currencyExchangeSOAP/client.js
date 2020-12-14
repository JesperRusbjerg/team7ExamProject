
var soap = require('soap');
var url = 'http://localhost:8000/wsdl?wsdl';

// Create client
soap.createClient(url, function (err, client) {
  if (err){
    throw err;
  }
  /* 
  * Parameters of the service call: they need to be called as specified
  * in the WSDL file
  */
  var args = {
    fromCurrency: "DK",
    toCurrency: "USD",
    amount: 52
  };
  // call the service
  client.UsToDk(args, function (err, res) {
    if (err)
      throw err;
      // print the service returned result
      console.log(typeof res)
    console.log(res); 
  });

  
});

// soap.createClient(url, function (err, client) {
//   if (err){
//     throw err;
//   }
//   /* 
//   * Parameters of the service call: they need to be called as specified
//   * in the WSDL file
//   */
//   var args = {
//     fromCurrency: "DK",
//     toCurrency: "USD",
//     amount: 327
//   };
//   // call the service
//   client.DkToUs(args, function (err, res) {
//     if (err)
//       throw err;
//       // print the service returned result
//   console.log(typeof res)

//     console.log(res.done); 
//   });

  
// });