const express = require('express')
const mongoose = require('mongoose')
const eventRoutes = require('./routes/eventRoutes')

const app = express()
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/EventDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected to EventDB'))
.catch((err) => console.error('MongoDB connection error:', err))

app.use('/events', eventRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
