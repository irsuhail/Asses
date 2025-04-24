const express=require('express');
const mongoose=require('mongoose');
require ('dotenv').config();

const authRoutes=require('./routes/auth');
const equipmentRoutes=require('./routes/equipment');
const cronJob=require('./utils/cron');

const app=express();

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/equipment',equipmentRoutes);

//Mongodb Connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>
    console.log("MongoDB connected")
)

.catch(err=>
    console.log("Mongo Error:", err)
);

cronJob.start();


const PORT=process.env.PORT || 7000;

app.listen(PORT, ()=>{
    console.log('Server Started', PORT)
})