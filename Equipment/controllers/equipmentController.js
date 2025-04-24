const Equipment=require('../models/Equipment');
const redisClient=require('../utils/redisClient');

exports.addEquipment=async (req,res)=>{
    try {
        const {name, category}=req.body;   
        const equipment=new Equipment({name, category, owner:req.user.userId});
        await equipment.save();
        res.status(201).json(equipment);

     } catch (err) {
        res.status(500).json({error:'Add failed'});

     }
};


exports.getAllAvailableEquipment=async (req,res)=>{
    const equipment=await Equipment.find({isAvailable:true});
    res.json(equipment);

};

exports.getOwnEquipment=async (req,res)=>{
    const equipment=await Equipment.find({owner:req.user.userId});
    res.json(equipment);

};


exports.updateEquipment=async (req,res)=>{
    const {id}=req.params;
    const updated=await Equipment.findOneAndUpdate(
        {_id:id, owner:req.user.userId},
        req.body,
        {new:true}
    );

    if (!updated) return res.status(404).json({error:'Not found or unauthorized'});
    res.json(updated);

};

xports.updateEquipment=async (req,res)=>{
    const {id}=req.params;
    const deleted=await Equipment.findOneAndDelete({_id:id, owner:req.user.userId});
    if (!deleted) return res.status(404).json({error:'Not found or unauthorized'});
    res.json({message:'Deleted'});
};


exports.rentEquipment=async (req,res)=>{
    const {id}=req.params;
    const equipment=await Equipment.findById(id);
    if (!equipment || !equipment.isAvailable) {
        return res.status(400).json({error:'Equipment not available'});

    }

    equipment.isAvailable=false;
    equipment.rentedBy=req.user.userId;
    await equipment.save();

    await redisClient.SETEX('equipment:${id}',120, JSON.stringify({rentedBy:req.user.userId}));

    res.json({message:'Equipment rented successfully'});
};