const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const http = require('http')
const fs = require('fs')
//
const connectDB = require('./config/db')
const errorMiddleware = require('./middlewares/error.middleware')
const authMiddleware = require('./middlewares/auth.middleware')

// dotenv config
dotenv.config()
connectDB()
const PORT = process.env.PORT
const routePath = './routes/'

const app = express()
const router = express.Router()

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(authMiddleware)

// auto import router
fs.readdirSync(routePath).forEach((file) => {
  require(routePath+file)(app, router)
})
app.use(errorMiddleware)


app.get('/', (req, res) => {
  res.send('<h1>Welcome to my job portal project</h1>')
})

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT} in ${process.env.DEV_MODE} mode`)
})
http.createServer(app)