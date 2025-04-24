const Equipment=require('../models/Equipment');

const rentControl=async (req,res,next)=>{
    const existingRental=await Equipment.findOne({
        rentedBy:req.user.userId,
        isAvailable:false
    });


    if (existingRental) {
        return res.status(400).json({error:'You can only rent one equipment at a time '});
    }

    next();
};

module.exports=rentControl;