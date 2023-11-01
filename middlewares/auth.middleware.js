const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    if (req.url.startsWith('/api/v1/auth')) return next()
    if (!req.headers.authorization) {
      return next('Authentication failed')
    }
    if (!req.headers.authorization.startsWith('Bearer')) {
      return next('Authentication failed')
    }
    const token = req.headers.authorization.split(' ')[1]
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = id
    return next()
  } catch (error) {
    next(error)
  }
}