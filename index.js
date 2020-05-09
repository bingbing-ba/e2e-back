const express = require('express')
const cypress = require('cypress')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  let baseUrl = req.query.baseUrl
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1)
  }
  /*
  cypress
    .open({
      browser: 'chrome',
      spec: './cypress/integration/django-pjt2.spec.js',
      config: {
        baseUrl,
      },
    })
    .then((result) => console.log('cypress open result: ', result))
    .catch((err) => console.log(err))
  */
  cypress
    .run({
      browser: 'chrome',
      spec: './cypress/integration/django-pjt2.spec.js',
      config: {
        baseUrl,
      },
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
