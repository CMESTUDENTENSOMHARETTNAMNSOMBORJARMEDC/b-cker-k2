const uuid = require('uuid')
const { validateId, validateData } = require('../validation')

const model = require('../models/books.models')
const { books } = model

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
    const id = req.params.id
    validateId(id)
    const foundBook = await model.findOne(id)
    if (!foundBook)
      throw new Error('id not found', {
        cause: `Could not find book with id: ${id}`,
      })
    res.json(foundBook)
  } catch (err) {
    next(err)
  }
}

async function addBook(req, res, next) {
  try {
    const data = req.body
    validateData(data, { task: 'new' })
    await model.addOne(data)
    const result = await model.findLastInserted()
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

async function deleteBook(req, res, next) {
  try {
    const id = req.params.id
    validateId(id)
    const foundBook = await model.findOne(id)
    if (!foundBook)
      throw new Error('id not found', {
        cause: `Could not find book with id: ${id}`,
      })
    await model.deleteOne(req.params.id)
    res.status(204).json({ info: 'deleted' })
  } catch (err) {
    next(err)
  }
}

async function editBook(req, res, next) {
  try {
    const data = req.body
    validateData(data, { task: 'partial' })
    const id = req.params.id
    validateId(id)
    const foundBook = await model.findOne(id)
    if (!foundBook)
      throw new Error('id not found', {
        cause: `Could not find book with id: ${id}`,
      })
		if (data.id) {
      const foundNewId = await model.findOne(data.id)
      if (foundNewId)
        throw new Error('id exists', {
          cause: `Book with id: ${data.id} already exists`,
        })
		}
    await model.updateOne(id, data)
    const result = await model.findOne(data.id || id)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function replaceBook(req, res, next) {
  try {
    const data = req.body
    validateData(data, { task: 'replace' })
    const id = req.params.id
    validateId(id)
    const foundBook = await model.findOne(id)
    if (!foundBook)
      throw new Error('id not found', {
        cause: `Could not find book with id: ${id}`,
      })
    const foundNewId = await model.findOne(data.id)
    if (foundNewId)
      throw new Error('id exists', {
        cause: `Book with id: ${data.id} already exists`,
      })
    await model.updateOne(id, data)
    const result = await model.findOne(data.id)
    res.json(result)
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
