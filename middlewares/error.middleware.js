const errorMiddleware = (err, req, res, next) => {
  console.log(err)
  return res.status(400).send({
    success: false,
    message: 'Something went wrong!',
    error: err
  })
}

module.exports = errorMiddleware