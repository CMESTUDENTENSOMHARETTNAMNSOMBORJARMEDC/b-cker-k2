const express = require('express')
const bodyParser = require('body-parser')
const handleError = require('./errorhandling')
const app = express()

const booksRouter = require('./routers/books.router')

app.use(bodyParser.json())

app.use(booksRouter)

app.all('*', (req, res) =>
  handleError(new Error('no route', {cause: `Route: ${req.url} does not exist`}), res)
);

app.use((err, req, res, next) => {
  handleError(err, res)
})

app.listen(4000, () => {
  console.log('Servern körs på port 4000')
})
