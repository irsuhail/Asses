const Task = require('../models/task.model')

// Create
const createTask = async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).json(task)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Read
const getTasks = async (req, res) => {
  try {
    const filter = {}
    if (req.query.priority) filter.priority = req.query.priority
    if (req.query.isCompleted) filter.isCompleted = req.query.isCompleted === 'true'
    const tasks = await Task.find(filter)
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update
const updateTask = async (req, res) => {
  try {
    const updates = req.body
    if (updates.isCompleted === true) {
      updates.completionDate = new Date()
    }
    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true })
    if (!task) return res.status(404).json({ message: 'Task not found' })
    res.json(task)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Delete
const deleteTasks = async (req, res) => {
  try {
    const { priority } = req.query
    if (!priority) return res.status(400).json({ message: 'Priority filter required' })

    const result = await Task.deleteMany({ priority })
    res.json({ deletedCount: result.deletedCount })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { createTask, getTasks, updateTask, deleteTasks }
