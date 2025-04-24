const jwt=require('jsonwebtoken');

const authmiddleware=(roles=[])=>{
    return (req,res,next)=>{
        const token=req.headers.authorization?.split(' ')[1];
        if (!token){
            return res.status(401).json({error:'Token required'});

        }

        try {
            const decoded=jwt.verify(token, process.env.JWT_SECRET);
            req.user=decoded;
            if (roles.length && !roles.includes(decoded.role)){
                return res.status(403).json({error:'Forbidden'});

            }

            next ();
        } catch (err) {
            return res.status(401).json({error:"Invalid token"});
        }
    };
};


module.exports=authmiddleware;