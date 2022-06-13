const db = require('../config/db')

/**
 *
 *
 */
let books = []

function findAll() {
  const q = 'SELECT * FROM books'
  return sqlPromise([q], 'r')
  // return new Promise((resolve, reject) => {
  //   db.all(q, (error, rows) => {
  //     if (error) {
  //       console.error(error.message);
  //       reject(error);
  //     }
  //     resolve(rows);
  //   })
  // })
}

function findOne(id) {
  const q = 'SELECT * FROM books WHERE id = ?'
  return sqlPromise([q, id], 'r')
}

function addOne(data) {
  const q = 'INSERT INTO books (title, author, genre) VALUES (?, ?, ?)'
  return sqlPromise([q, [data.title, data.author, data.genre]])
}

function deleteOne(id) {
  const q = 'DELETE FROM books WHERE id = ?'
  return sqlPromise([q, id])
}

function updateOne(id, data) {
  const props = Object.keys(data)
    .reduce((res, prop) => (res += ` ${prop} = ?,`), '')
    .slice(0, -1)
  const q = `UPDATE books	SET${props} WHERE id = ?`

  return sqlPromise([q, [...Object.values(data), id]])
}

function sqlPromise(query, rows = '') {
  return new Promise((resolve, reject) => {
    console.log(...query)
    db.all(...query, (error, rows) => {
      if (error) {
        console.log('erererrereere--')
        console.error(error.message)
        reject(error)
      }
      if (rows === '') {
        resolve()
      } else {
        resolve(rows)
      }
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
}
