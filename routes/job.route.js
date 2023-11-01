const {
  createJobHandler,
  getAllJobHandler,
  getJobHandler,
  updateJobHandler
} = require('../controllers/job.controller')

module.exports = (app, router) => {
  router.post('/jobs', createJobHandler)
  router.get('/jobs', getAllJobHandler)
  router.get('/jobs/:jobId', getJobHandler)
  router.patch('/jobs/update/:jobId', updateJobHandler)

  app.use('/api/v1', router)
}