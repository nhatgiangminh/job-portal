const Job = require('../models/job.model')

// -----------CREATE JOB------------ //
const createJobHandler = async (req, res, next) => {
  try {
    const { company, position } = req.body
    if (!company || !position) {
      next('Please provide all fields')
    }
    req.body.createdBy = req.user
    await Job.create(req.body)
    return res.status(200).send({
      success: true,
      message: 'Job created successfully'
    })
  } catch (error) {
    next(error)
  }
}
// -----------GET JOB------------ //
const getJobHandler = async (req, res, next) => {
  try {
    const { jobId } = req.params
    if (!jobId) {
      return next('Invalid job id')
    }
    const jobData = await Job.findById(jobId)
    if (!jobData) {
      return next('Job does not exist')
    }
    return res.status(200).send({
      success: true,
      data: jobData
    })
  } catch (error) {
    next(error)
  }
}
// -----------GET ALL JOB------------ //
const getAllJobHandler = async (req, res, next) => {
  try {
    const jobData = await Job.find()
    // if (!jobData.length) {
    //   return next('No available jobs')
    // }
    return res.status(200).send({
      success: true,
      data: jobData
    })
  } catch (error) {
    next(error)
  }
}
// -----------UPDATE JOB------------ //
const updateJobHandler = async (req, res, next) => {
  try {
    if (req.body.hasOwnProperty('company') && !req.body.company) {
      return next('Please provide require field')
    }
    if (req.body.hasOwnProperty('position') && !req.body.position) {
      return next('Please provide require field')
    }
    const job = await Job.findById(req.params.jobId)
    if (!job) {
      return next('Job id is invalid')
    }
    if (req.user !== job.createdBy.toString()) {
      return next('You are not authorized to update this job')
    }
    await Job.findByIdAndUpdate(req.params.jobId, req.body, { new: true, runValidator: true })
    return res.status(200).send({
      success: true,
      message: 'Update job successfully'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createJobHandler,
  getJobHandler,
  getAllJobHandler,
  updateJobHandler
}
