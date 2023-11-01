const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name is required']
  },
  lastName: {
    type: String
  },
  password: {
    type: String,
    require: [true, 'Password is required'],
    minLength: [6, 'Password must be greater than 6 characters'],
    // select: true
  },
  location: {
    type: String,
    default: 'Viet Nam'
  },
  email: {
    type: String,
    require: [true, 'Email is require'],
    unique: true,
    validate: validator.isEmail
  }
}, {
  timestamps: { currentTime: () => Date.now() }
})
// middleware
userSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
// create token method
userSchema.methods.createToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}
// compare password
userSchema.methods.comparePassword = async function(pw) {
  const isMatch = await bcrypt.compare(pw, this.password)
  return isMatch
}

module.exports = mongoose.model('User', userSchema)