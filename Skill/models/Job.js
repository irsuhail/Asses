const mongoose=require("mongoose");

const jobSchema=new mongoose.Schema({
    title:String,
    description:String,
    requiredSkills:[String],
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    applicants:[{
        type:mongoose.Schema.Types.ObjectId,ref:"User"}]
});

module.exports=mongoose.model("Job", jobSchema);