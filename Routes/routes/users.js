const express = require('express');
const router = express.Router();

let users = [];

// CREATE
router.post('/', (req, res) => {
  users.push(req.body);
  res.status(201).send('User created');
});

// READ
router.get('/', (req, res) => {
  res.send(users);
});

// UPDATE
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users[id] = req.body;
  res.send('User updated');
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users.splice(id, 1);
  res.send('User deleted');
});

module.exports = router;
