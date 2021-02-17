const express = require('express')
const cypress = require('cypress')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/:toTest', (req, res) => {
  let baseUrl = req.query.baseUrl
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1)
  }
  cypress
    .run({
      spec: './cypress/integration/pjt_0408/index.spec.js',
      config: {
        baseUrl,
      },
      env:{
        toTest:req.params.toTest,
      }
    })
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})
const port = 3000
app.listen(port, () => console.log(`server listening http://localhost:${port}`))
