const express = require('express')
const logger = require('morgan')
const path = require('path')
const productRouter = require('./app/product/routes')

const app = express()

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})
app.use('/api/v1/product', productRouter)

app.use((req, res) => {
  res.status(404).send({
    status: 'failed',
    message: `Resource ${req.originalUrl} not found`,
  })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})

module.exports = app
