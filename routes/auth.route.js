const { registerHandler, loginHandler } = require('../controllers/auth.controller')

module.exports = (app, router) => {
  router.post('/register', registerHandler)
  router.post('/login', loginHandler)

  app.use('/api/v1/auth', router)
}