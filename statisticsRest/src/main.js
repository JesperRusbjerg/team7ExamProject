
var stats = require('./statistics')

const express = require('express')
const app = express()
const port = 1234

app.get('/userStats', async (req, res) => {

  console.log("hejsa")

    let succesFull = await stats.succes();
    let unsuccessFull = await stats.unSucces();

    response = {
        howManyLoginAttempsFail: unsuccessFull/succesFull+"%"
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