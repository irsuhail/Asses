const Equipment=require('../models/Equipment');

const deletionWatcher=async(req,res,next)=>{
    const {id}=req.params;

    const equipment=await Equipment.findById(id);

    if (equipment && !equipment.isAvailable) {
        return res.status(400).json({error:"Cannot delete rented equipment"});

    }

    next();
};

module.exports=deletionWatcher;