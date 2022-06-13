const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./db.sqlite', (error) => {
  if (error) {
    console.error(error.message)
    throw error
  }

  const booksStatement = `
    CREATE TABLE books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      author TEXT,
      genre TEXT
    )
  `

  db.run(booksStatement, (error) => {
    if (error) {
      console.error(error.message);
      //throw error;
    } else {
      const insert = "INSERT INTO books (title, author, genre) VALUES (?, ?, ?)"
      db.run(insert, ["sagan", "tolkien", "fantasy"])
    }
  })
})

module.exports = db
