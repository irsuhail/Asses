const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    pasword:String,
    role:{type:String, enum:["admin","candidate"], required:true}, 
    skills:{type:[String], require:function() {
        return
        this.role==="candidate";} }
});

module.exports=mongoose.model("User",userSchema);