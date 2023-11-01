const User = require('../models/user.model')

// -----------GET USER------------//
const getUserHandler = async (req, res, next) => {
  try {
    const userId = req.params.id
    const userData = await User.findById(userId).select('-password -__v')
    if (!userData) {
      return next('User does not exist')
    }
    return res.status(200).send({
      success: true,
      data: userData
    })
  } catch (error) {
    next(error)
  }
}
// -----------UPDATE USER------------//
const updateUserHandler = async (req, res, next) => {
  try {
    const { name, lastName, location } = req.body
    if (!name || !lastName || !location) {
      return next('Please provide all fields')
    }
    const userId = req.user
    console.log(userId)
    await User.findByIdAndUpdate(userId, {...req.body})

    return res.status(200).send({
      succes: true,
      data: {}
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUserHandler,
  updateUserHandler
}
