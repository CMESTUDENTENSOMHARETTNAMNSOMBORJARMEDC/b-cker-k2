const bookDescription = {
  id: 'number',
  title: 'string',
  author: 'string',
  genre: 'string',
}

const validateData = (data, options = { task: 'new' }) => {
  const keys = Object.keys(data)
  const descriptionKeys = Object.keys(bookDescription)
  if (!keys.every((prop) => prop in bookDescription)) {
    throw new Error('invalid prop', {
      cause: 'One or more properties are not supported',
    })
  }
  if (
    !keys.every(
      (prop) => bookDescription[prop] === typeof data[prop] && data[prop] !== ''
    )
  ) {
    throw new Error('invalid type', {
      cause: 'One or more properties have the wrong type',
    })
  }
  if (options.task === 'new') {
    if (keys.length === descriptionKeys.length - 1) return true
    throw new Error('invalid props', {
      cause: 'There are either too many or too few properties',
    })
  }
  if (options.task === 'partial') {
    return true
  }
  if (options.task === 'replace') {
    if (keys.length === descriptionKeys.length) return true
    throw new Error('invalid props', {
      cause: 'There are either too many or too few properties',
    })
  }
  throw new Error('unknown')
}

const validateId = (id) => {
  const parsedId = parseInt(id)
  if (isNaN(parsedId))
    throw new Error('invalid id', {
      cause: `Can't parse id: ${id}. Is not integer.`,
    })
  return true
}

module.exports = {
  validateData,
  validateId,
}
