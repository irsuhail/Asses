const cron=require('node-cron');

const redisClient=require('./redisClient');
const Equipment=require('../models/Equipment');


const job=cron.schedule('*/2*****', async()=>{
    console.log('[CRON] Checking expired rentals...');

    const keys=await redisClient.keys('equipment:*');


    for (let key of keys) {
        const exists=await redisClient.ttl(key);

        if (exists<=0) {
            const equipmentId=key.split(':')[1];
            await Equipment.findByIdAndUpdate(equipmentId,{
                isAvailable:true,
                rentedBy:null
            });

            await redisClient.del(key);
            console.log('[CRON] Released equipment:${equipmentId}');
        }
    }
});

module.exports=job;