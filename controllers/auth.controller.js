const User = require('../models/user.model')

//-----------------REGISTER REQUEST-------------------
const registerHandler = async (req, res, next) => {
  try {
    const { name, password, email } = req.body
  
    if (!name) {
      return next('name is required')
    }
    if (!password) {
      return next('password is required')
    }
    if (!email) {
      return next('email is required')
    }
    // check user existed
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      next('User is existed, please login instead!')
    }
    // create user
    await User.create({ ...req.body })
    // response success
    return res.status(200).send({
      success: true,
      message: 'User created successfully!'
    })
  } catch (error) {
    next(error)
  }
}
//-----------------LOGIN REQUEST-------------------
const loginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body
    // check fields
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        error: 'Please provide all fields'
      })
    }
    const userInstance = await User.findOne({ email }).select('-__v')
    // check user exist
    if (!userInstance) {
      return res.status(400).send({
        success: false,
        error: 'Invalid email or password'
      })
    }
    const isMatch = await userInstance.comparePassword(password)
    // check password is match
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        error: 'Invalid email or password'
      })
    }
    // remove password field from response object
    userInstance.password = undefined
    // create token for authentication
    const token = userInstance.createToken()
    return res.status(200).send({
      success: true,
      message: 'Login successfully',
      token,
      userInstance
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { registerHandler, loginHandler }