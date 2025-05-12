const express = require('express')
const connectToDb = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

const app = express()
app.use(express.json())

connectToDb();

app.use(userRoutes)
app.use(postRoutes)

app.listen(3000,()=>{
    console.log("server started on http://localhost:3000");
})
