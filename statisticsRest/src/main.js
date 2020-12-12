
var stats = require('./statistics')

const express = require('express')
const app = express()
const port = 1234

app.get('/userStats', async (req, res) => {


    let logins = await stats.loginData();

    let max = logins.successfullLogins > logins.unsuccessfullLogins ? logins.successfullLogins : logins.unsuccessfullLogins

    let lowest = logins.successfullLogins > logins.unsuccessfullLogins ?  logins.unsuccessfullLogins : logins.successfullLogins

    response = {
        howManyLoginAttempsFail: Math.round(((lowest/max) * 100) * 10) / 10
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));

})


app.get('/microStats', async (req, res) => {

    
  let microStats = await stats.microObjects();

  let total = 0;

  for (const [key, value] of Object.entries(microStats)) {
    total += value
  }

  for (const [key, value] of Object.entries(microStats)) {
    microStats[key] = Math.round(((value/total) * 100) * 10) / 10;
  }

  res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(microStats));

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})