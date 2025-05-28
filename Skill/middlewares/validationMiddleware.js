module.exports=(req,res,next)=>{
    const {name,email,password,role,skills}=req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({error:"All fields are required"});
    }


    if (!["admin","candidate"].includes(role)) {
        return res.status.json({error:"Role must be 'admin' or 'candidate' "});
    }

    if (role==="candidate"){
        if (!Array.isArray(skills)|| skills.length===0) {
            return res.status(400).json({error:"Candidates must provide a non-empty skills array"});
        }
    }
    next();
}