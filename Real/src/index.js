const fs=require('fs');

const {generateFile}=require('./fileGenerator');
const {monitorProcessingFolder}=require('./processor');

const folders=[
    'logs',
    'files/processing',
    'files/in_progress',
    'files/processed',
    'files/crashed'
];


folders.forEach(folder=>{
    if (!fs.existsSync(folder)) {
        fs.mkdir(folder,{recursive:true});
    }
});

monitorProcessingFolder();

setInterval(()=>{
    const file=generateFile();
    console.log(`Generated new file: ${file.split('/').pop()}`);
},3000);