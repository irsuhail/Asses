const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();
app.use(express.json());

// Create write stream to log file
const logPath = path.join(__dirname, 'src', 'access.log');
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

// Custom log format: Method, URL, Status, Content-Length, Response-Time, HTTP Version, Date
morgan.token('date', () => new Date().toISOString());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms HTTP/:http-version :date', { stream: logStream }));

// Routes

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the homepage');
});

app.get('/get-users', (req, res) => {
  res.status(200).send('User list fetched');
});

app.post('/add-user', (req, res) => {
  res.status(201).send('User added successfully');
});

app.put('/user/:id', (req, res) => {
  res.status(201).send(`User with ID ${req.params.id} updated successfully`);
});

app.delete('/user/:id', (req, res) => {
  res.send(`User with ID ${req.params.id} deleted successfully`);
});

// Start server

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
