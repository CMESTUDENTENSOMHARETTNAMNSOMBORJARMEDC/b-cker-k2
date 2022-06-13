const errorResponse = {}
errorResponse['id not found'] = { code: 404, text: 'id not found' }
errorResponse['empty body'] = { code: 404, text: 'empty body' }
errorResponse['no route'] = { code: 404, text: 'no route' }
errorResponse['invalid id'] = { code: 400, text: 'invalid id' }
errorResponse['write error'] = { code: 500, text: 'io error' }
errorResponse['SyntaxError'] = { code: 400, text: 'bad json' }
errorResponse['invalid type'] = { code: 400, text: 'bad type or empty text' }
errorResponse['invalid prop'] = { code: 400, text: 'bad prop' }
errorResponse['invalid props'] = { code: 400, text: 'bad props' }
errorResponse['empty text'] = { code: 400, text: 'no text' }
errorResponse['test'] = { code: 408, text: 'test' }

const getErrorResponse = (error) => {
  console.log(error)
  return error in errorResponse
    ? errorResponse[error]
    : { code: 500, text: 'unknown error' }
}

const handleError = (error, res) => {
  const { code, text } = getErrorResponse(error.name || error)
  res.status(code).json({ error: text })
}

module.exports = handleError

