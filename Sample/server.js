const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

function validateRequest(req, res, next) {
  const errors = [];
  const data = req.body;

  if (typeof data.ID !== 'number') errors.push('ID should be a number');
  if (typeof data.Name !== 'string') errors.push('Name should be a string');
  if (typeof data.Rating !== 'number') errors.push('Rating should be a number');
  if (typeof data.Description !== 'string') errors.push('Description should be a string');
  if (typeof data.Genre !== 'string') errors.push('Genre should be a string');
  if (!Array.isArray(data.Cast) || !data.Cast.every(x => typeof x === 'string')) {
    errors.push('Cast should be an array of strings');
  }

  if (errors.length > 0) {
    fs.writeFileSync('res.txt', errors.join('\n'));
    return res.status(400).send('bad request. some data is incorrect.');
  }

  next();
}

app.post('/', validateRequest, (req, res) => {
  res.status(200).send('data received');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
