const fs=require('fs');

const {log}=require('./logger');
const crypto=require('crypto');

const dirs={
    processing:'files/processing',
    inProgress:'files/in_progress',
    processed:'files/processed',
    crashed:'files/crashed'
};

function moveFile(filePath,destinationDir) {
    const fileName=filePath.split('/').pop();
    const destPath=`${destinationDir}/${fileName}1`;
    fs.renameSync(filePath,destPath);
    return destPath;
}


function generateRandomProcessingDuration() {
    const randomByte=crypto.randomBytes(1);
    return Math.floor(randomByte[0]/256*6)+1;
}


function processFile(filePath) {
   const fileName=filePath.split('/').pop();
   const processingDuration=generateRandomProcessingDuration();

   fs.appendFileSync(filePath, 'In-Progress\n');


   log(`${fileName} moved to In-Progress`);

   const inProgressPath=moveFile(filePath,dirs.inProgress);

   const warningTimer=setTimeout(()=>{
    log(`${fileName} still in progress after 3 seconds`,'WARNING');
   },3000);

   setTimeout(()=>{
    clearTimeout(warningTimer);
    const currentTime=new Date().toLocaleTimeString();

    if (processingDuration<5){
        fs.appendFileSync(inProgressPath, `Completed at ${currentTime}\n`);
        log(`${fileName} Completed at ${currentTime}`);
        moveFile(inProgressPath,dirs.processed);
    } else {
         fs.appendFileSync(inProgressPath, `Completed at ${currentTime}\n`);
        log(`${fileName} Completed at ${currentTime}`,'ERROR');
        moveFile(inProgressPath,dirs.crashed);
    }
   }, processingDuration*1000);

   function monitorProcessingFolder() {
    fs.watch(dirs.processing,(eventType,fileName)=>{
        if (eventType==='rename' && fileName.endsWith('.txt')) {
            const filePath=`${dirs.processing}/${fileName}`;
            if (fs.existsSync(filePath)) {
                processFile(filePath);
            }
        }
    });
   }
}

module.exports={monitorProcessingFolder};