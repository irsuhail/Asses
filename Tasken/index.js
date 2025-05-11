const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/taskRoutes')

const app = express()
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/TaskDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err))

app.use('/tasks', taskRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
