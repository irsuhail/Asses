const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

require("dotenv").config();

const authRoutes=require("./routes/authRoutes");
const adminRoutes=require("./routes/adminRoutes");
const candidateRoutes=require("./routes/candidateRoutes");

const app=express();
app.use(cors());

app.use(express.json());

app.use("/auth",authRoutes);
app.use("/admin",adminRoutes);
app.use("/candidate",candidateRoutes);

mongoose.connect(process.env.MONGO_URI, ()=>{
    console.log("MongoDB Connected")

    const PORT=process.env.PORT || 5000;

    app.listen(8000,()=>{
        console.log("server started on http://localhost:8000");
    });
})

.catch ((err)=>{
    console.error("Connection Failed:", err.message);
});
