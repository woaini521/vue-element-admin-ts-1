const express = require('express')
const router = require('./router')
const fs = require('fs')
const https = require('https')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', router)

// 读取https证书
const credentials = {
  key: fs.readFileSync('./https/shiluyue.cn.key'),
  cert: fs.readFileSync('./https/shiluyue.cn.pem')
}

const httpsServer = https.createServer(credentials, app)


app.listen(5000, () => {
  console.log('http server is running')
})

const SSLPORT = 18082
httpsServer.listen(SSLPORT, () => {
  console.log(`HTTPS Server is running on: https://localhost:%s${SSLPORT}`)
})