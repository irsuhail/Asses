const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1];

    if (!token) {
        return
    }

    res.status(401).json({error:"Token required"});

    try {
        const decoded=jwt.verify(token, process.env.JWT_SECERT);
        req.user=decoded;
        next();
    } catch {
        res.status(403).json({error:"Invalid token"});
    }
};