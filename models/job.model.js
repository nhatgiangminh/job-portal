const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
  company: {
    type: String,
    require: [true, 'Company name is required']
  },
  position: {
    type: String,
    require: [true, 'Job position is required']
  },
  status: {
    type: String,
    enum: ['pending', 'reject', 'interview'],
    default: 'pending'
  },
  workType: {
    type: String,
    enum: ['part-time', 'full-time', 'internship'],
    default: 'full-time'
  },
  workLocation: {
    type: String,
    default: 'Ho Chi Minh City',
    require: [true, 'Work location is required']
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)
