const rp = require('request-promise');
const url = 'https://www.google.com/search?q=exchange+rate+usd+to+dkk&oq=exchange+rate+&aqs=chrome.2.69i57j0l5j69i60l2.5657j0j7&sourceid=chrome&ie=UTF-8';
const cheerio = require("cheerio");

function usdToDkk() {

  return new Promise((resolve, reject) => {
    rp(url)
    .then(function(html) {
      
      const $ = cheerio.load(html);
      
      const bodyText = $('#main').text()
      
      var firstSplit = bodyText.split("1 USD = ")
      
      var secondSplit = firstSplit[1]
      
      var res = secondSplit.split(" DKK")[0];
      resolve(res)
      
    })
    .catch(function(err) {
        reject(err)
    });
    
  })

}


module.exports.usdToDkk = usdToDkk
