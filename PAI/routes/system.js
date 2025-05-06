const express=require("express");
const os=require("os");
const dns=require("dns");

const getRandomePrime=require("../utils/randomPrime");
const primeLimitChecker=require("../middlewares/primeLimitChecker");

const router=express.Router();

//Get
router.get("/randomprime/:num", primeLimitChecker, (req,res)=>{
    const num=parseInt(req.params.num,10);
    const prime=getRandomePrime(num);
    res.json({prime});
})


//Get website=masaischool
router.get("/getipdetails",(req,res)=>{
    const {website}=req.query;

    if (!website) {
        return res.status(400).send("website required");

        dns.lookup(website,(err, address)=>{
            if (err) 
                return res.status(500).send("DNS Lookup Failed");
                res.json({website,ip:address});
            
        });
    }
});

//Get

router.get("/getsysteminfo",(req,res)=>{
    const info={
        platform:os.platform(),
        architecture:os.arch(),
        uptime:os.uptime(),
        totalMemory:os.totalmem(),
        freeMemory:os.freemem(),
    };
    res.json(info);
});

module.exports=router;


