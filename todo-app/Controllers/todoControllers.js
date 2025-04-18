const Todo = require('../models/todoModel');

exports.createTodo = async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.status(201).send(todo);
};

exports.getAllTodos = async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
};

exports.getTodoById = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.send(todo);
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(todo);
};

exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.send({ message: 'Todo deleted' });
};
