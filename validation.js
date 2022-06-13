const bookDescription = {
  title: 'string',
  author: 'string',
  genre: 'string',
}

const validate = (data, options = { task: 'new' }) => {
  console.log('validating')
  const keys = Object.keys(data)
  const descriptionKeys = Object.keys(bookDescription)
  if (!keys.every((prop) => prop in bookDescription)) {
    throw 'invalid prop'
  }
  if (
    !keys.every(
      (prop) => bookDescription[prop] === typeof data[prop] && data[prop] !== ''
    )
  ) {
    throw 'invalid type'
  }
  if (options.task === 'new') {
    if (keys.length === descriptionKeys.length) return true
    throw 'invalid props'
  }
  if (options.task === 'partial') {
    return true
  }
  if (options.task === 'replace') {
    if (keys.length === descriptionKeys.length) return true
    throw 'invalid props'
  }
  throw 'unknown'
}

module.exports = validate
