module.exports=(req,res,next)=>{
    const num=parseInt(req.params.num, 10);
    if (num>1000){
       return res.status(400).send("Number is Large");
    }
    next();
};