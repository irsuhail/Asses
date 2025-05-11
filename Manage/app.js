const express = require('express')
require('dotenv').config()
require('./config/db')

const taskRoutes = require('./routes/task.routes')

const app = express()
app.use(express.json())
app.use('/tasks', taskRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
