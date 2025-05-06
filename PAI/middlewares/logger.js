const fs=require("fs");

function getFormattedTimestamp() {
    const now=new Date();
    const date=now.toLocaleDateString();
    const time=now.toLocaleDateString();
    return {date,time};
}
module.exports=(req,res,next)=>{
    const log='${getFormattedTimestamp()}-${req.methos} ${req.url}';

    fs.appendFile("logs.txt", log, (err)=>{
        if (err){
            console.error("Error in logs.txt:", err);
        }
    });
    next();
}

module.exports=getFormattedTimestamp;