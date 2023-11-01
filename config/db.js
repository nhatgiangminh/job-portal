const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to mongodb ${mongoose.connection.host}`)
  } catch (error) {
    console.log('Connect db error', error)
  }
}

module.exports = connectDB