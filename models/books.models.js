const db = require('../config/db')

/**
 *
 *
 */
let books = []

function findAll() {
  const q = 'SELECT * FROM books'
  return new Promise((resolve, reject) => {
    db.all(q, (error, rows) => {
      if (error) {
        console.error(error.message)
        reject(error)
      }
      resolve(rows)
    })
  })
}

function findOne(id) {
  const q = 'SELECT * FROM books WHERE id = ?'
  return new Promise((resolve, reject) => {
    db.get(q, id, (error, rows) => {
      if (error) {
        console.error(error.message)
        reject(error)
      }
      resolve(rows)
    })
  })
}

function addOne(data) {
  const q = 'INSERT INTO books (title, author, genre) VALUES (?, ?, ?)'
  return new Promise((resolve, reject) => {
    db.run(q, [data.title, data.author, data.genre], (error) => {
      if (error) {
        console.error(error)
        reject(error)
      }
      resolve(this)
    })
  })
}

function deleteOne(id) {
  const q = 'DELETE FROM books WHERE id = ?'
  return new Promise((resolve, reject) => {
    db.run(q, id, (error) => {
      if (error) {
        reject(error)
      }
      resolve()
    })
  })
}

function updateOne(id, data) {
  const props = Object.keys(data)
    .reduce((res, prop) => (res += ` ${prop} = ?,`), '')
    .slice(0, -1)
  const q = `UPDATE books	SET${props} WHERE id = ?`
  console.log(id)
  return new Promise((resolve, reject) => {
    db.run(q, [...Object.values(data), id], (error) => {
      if (error) {
        reject(error)
      }
      resolve(this)
    })
  })
}

function findLastInserted() {
  const q = 'SELECT * FROM books WHERE id = last_insert_rowid()'
  return new Promise((resolve, reject) => {
    db.get(q, (error, rows) => {
      if (error) {
        reject(error)
      }
      resolve(rows)
    })
  })
}

function exists(id) {
  const q = 'SELECT * FROM books WHERE id = ?'
  return new Promise((resolve, reject) => {
    db.get(q, id, (error, rows) => {
      if (error) {
        reject(error)
      }
      resolve(rows)
    })
  })
}



module.exports = {
  books,
  findAll,
  addOne,
  findOne,
  deleteOne,
  updateOne,
  findLastInserted
}
