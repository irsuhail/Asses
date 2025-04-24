const mongoose=require('mongoose');

const equipmentSchema=new mongoose.Schema({
    name:String,
    category:{
        type:String,
        enum:['construction','mechanical', 'mechanical'],
        required:true
    },
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    isAvailable:{type:Boolean,default:true},
    rentedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',default:null}

});

module.exports=mongoose.model('Equipment',equipmentSchema);