
const express = require('express');
const os = require('os');
const dns = require('dns');
const readFileContent = require('./read');

const app = express();
const PORT = 3001;


app.get('/test', (req, res) => {
  res.send('Test route is working!');
});


app.get('/readfile', (req, res) => {
  const content = readFileContent();
  res.send(content);
});


app.get('/systemdetails', (req, res) => {
  const totalMemGB = (os.totalmem() / (1024 ** 3)).toFixed(2);
  const freeMemGB = (os.freemem() / (1024 ** 3)).toFixed(2);

  const systemDetails = {
    platform: os.platform(),
    totalMemory: `${totalMemGB} GB`,
    freeMemory: `${freeMemGB} GB`,
    cpuModel: os.cpus()[0].model,
    cpuCores: os.cpus().length  
  };

  res.json(systemDetails);
});


app.get('/getip', (req, res) => {
  dns.lookup('masaischool.com', { all: true }, (err, addresses) => {
    if (err) {
      return res.status(500).json({ error: 'DNS lookup failed', message: err.message });
    }

    const ips = addresses.map(addr => addr.address);
    res.json({
      hostname: 'masaischool.com',
      ipAddresses: ips
    });
  });
});


app.listen(3001,()=>{
    console.log("server started on http://localhost:3001");
})
