const express = require('express');
const router = express.Router();

let todos = [];

// CREATE
router.post('/', (req, res) => {
  todos.push(req.body);
  res.status(201).send('Todo created');
});

// READ
router.get('/', (req, res) => {
  res.send(todos);
});

// UPDATE
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos[id] = req.body;
  res.send('Todo updated');
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos.splice(id, 1);
  res.send('Todo deleted');
});

module.exports = router;
