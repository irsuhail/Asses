const fs=require("fs");

const logFilePath='logs/tops.txt';

function log(message, level='INFO') {
    const timestamp=new Date().toISOString();
    const entry=`[${level}] ${timestamp}-${message}\n`;
    fs.appendFileSync(logFilePath,entry,"utf-8");
}

module.exports={log};