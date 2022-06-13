const uuid = require('uuid')
const validate = require('../validation')

const model = require('../models/books.models')
const { books } = model

// async function getBooks(req, res) {
async function getBooks(req, res, next) {
  try {
    const result = await model.findAll()
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function getBook(req, res, next) {
  try {
    const foundBook = await model.findOne(req.params.id)
    if (!foundBook.length) throw 'id not found'
    res.json(foundBook)
  } catch (err) {
    next(err)
  }
}

async function addBook(req, res, next) {
  try {
    const data = req.body
    validate(data, { task: 'new' })
    console.log(req.body)
    const result = await model.addOne(data)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

async function deleteBook(req, res, next) {
  try {
    const foundBook = await model.findOne(req.params.id)
    if (!foundBook.length) throw 'id not found'
    await model.deleteOne(req.params.id)
    res.status(204).json({ info: 'deleted' })
  } catch (err) {
    next(err)
  }
}

async function editBook(req, res, next) {
  try {
    const data = req.body
    validate(data, { task: 'partial' })
    const id = req.params.id
    const foundBook = await model.findOne(id)
    if (!foundBook.length) throw 'id not found'
    const result = await model.updateOne(id, data)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function replaceBook(req, res, next) {
  try {
    const data = req.body
    validate(data, { task: 'replace' })
    console.log('validated')
    const id = req.params.id
    const foundBook = await model.findOne(id)
    if (!foundBook.length) throw 'id not found'
    console.log('found book')
    const result = await model.updateOne(id, data)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function findBook(id, next) {
  try {
    const foundBook = await model.findOne(id)
    console.log(`found book ${foundBook}`)
    if (!foundBook.length) throw 'not found'
    return foundBook
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getBooks,
  getBook,
  editBook,
  deleteBook,
  addBook,
  replaceBook,
}
