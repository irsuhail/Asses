const jwt=require('jsonwebtoken');
const User=require('../models/User');

exports.signup=async(req,res)=>{
    const {username, password,role}=req.body;

    try {
        const user=new User({username,password,role});
        await user.save();
        res.status(201).json({message:'User registered successfully'});

    } catch (err) {
        res.status(500).json({error:'Signup failed'});
    }
};


exports.login=async(req,res)=>{
    const {username, password}=req.body;
    try {
      const user=await User.findOne({username,password});
      if (!user) {
        return res.status(401).json({error:'Invalid credentials'});

        const token=jwt.sign({userId:user._id, role:user.role}, process.env.JWT_SECRET)
        res.json({token});
      }
    } catch (err) {
       res.status(500).json({error:'Login failed'});
    }
};