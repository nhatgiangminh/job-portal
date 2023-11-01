const { getUserHandler, updateUserHandler } = require('../controllers/user.controller')

module.exports = (app, router) => {
  router.get('/users/:id', getUserHandler)
  router.put('/users/:id', updateUserHandler)

  app.use('/api/v1', router)
}
