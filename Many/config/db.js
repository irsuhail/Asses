const mongoose=require("mongoose");

const connectToDb=()=>{
mongoose.connect("mongodb://127.0.0.1:27017/NEMB45").then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log("Failed to Connect to DB")
})
}

module.exports=connectToDb;