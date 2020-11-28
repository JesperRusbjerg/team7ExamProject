
var stats = require('./statistics')

const express = require('express')
const app = express()
const port = 1234

app.get('/userStats', async (req, res) => {

    let succesFull = await stats.succes();
    let unsuccessFull = await stats.unSucces();

    response = {
        howManyLoginAttempsFail: unsuccessFull/succesFull+"%"
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})