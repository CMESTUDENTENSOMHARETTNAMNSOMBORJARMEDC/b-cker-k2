const express = require('express')
const bodyParser = require('body-parser')
const handleError = require('./errorhandling')
const app = express()

const booksRouter = require('./routers/books.router')

app.use(bodyParser.json())
app.use(express.json())

app.use(booksRouter)

app.use((err, req, res, next) => {
  console.log(err.message)
  console.log('caught error in middleware')
  handleError(err, res)
})

app.listen(4000, () => {
  console.log('Servern körs på port 4000')
})
