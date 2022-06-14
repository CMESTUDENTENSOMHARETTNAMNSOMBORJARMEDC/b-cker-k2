const uuid = require('uuid')
const { validateId, validateData } = require('../validation')

const model = require('../models/books.models')
const { books } = model

async function getBooks(_, res, next) {
  try {
    const result = await model.findAll()
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function getBook({ params: { id } }, res, next) {
  try {
    validateId(id)
    const foundBook = await bookExists(id)
    res.json(foundBook)
  } catch (err) {
    next(err)
  }
}

async function addBook({ body: data}, res, next) {
  try {
    validateData(data, { task: 'new' })
    await model.addOne(data)
    const result = await model.findLastInserted()
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

async function deleteBook({ params: { id } }, res, next) {
  try {
    validateId(id)
    await bookExists(id)
    await model.deleteOne(id)
    res.status(204).json({ info: 'deleted' })
  } catch (err) {
    next(err)
  }
}

async function editBook({ body: data, params: { id } }, res, next) {
  try {
    validateData(data, { task: 'partial' })
    validateId(id)
    await bookExists(id)
    if (data.id && data.id != id) await idExists(data.id)
    await model.updateOne(id, data)
    const result = await model.findOne(data.id || id)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function replaceBook({ body: data, params: { id } }, res, next) {
  try {
    validateData(data, { task: 'replace' })
    validateId(id)
    await bookExists(id)
    if (data.id != id) await idExists(data.id)
    await model.updateOne(id, data)
    const result = await model.findOne(data.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function bookExists(id) {
  return new Promise(async (resolve, reject) => {
    const foundBook = await model.findOne(id)
    if (!foundBook)
      reject(
        new Error('id not found', {
          cause: `Could not find book with id: ${id}`,
        })
      )
    resolve(foundBook)
  })
}

async function idExists(id) {
  return new Promise(async (resolve, reject) => {
    const foundBook = await model.findOne(id)
    if (foundBook)
      reject(
        new Error('id exists', {
          cause: `Book with id: ${id} already exists`,
        })
      )
    resolve(true)
  })
}

module.exports = {
  getBooks,
  getBook,
  editBook,
  deleteBook,
  addBook,
  replaceBook,
}
