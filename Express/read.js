
const fs = require('fs');
const path = require('path');

function readFileContent() {
  const filePath = path.join(__dirname, 'Data.txt');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
  } catch (error) {
    return 'Error reading file: ' + error.message;
  }
}

module.exports = readFileContent;
