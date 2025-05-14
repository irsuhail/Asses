const fs=require('fs');

const processingDir='files/processing';

function generateFile() {
    const timestamp=Date.now();
    const fileName=`file_${timestamp}.txt`;
    const filePath=`${processingDir}/${fileName}`;
    const content=`File Started Processing\n`;

    fs.writeFileSync(filePath,content);
    return filePath;
}


module.exports={generateFile};