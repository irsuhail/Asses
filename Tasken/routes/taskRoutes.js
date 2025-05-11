const express = require('express')
const router = express.Router()
const Task = require('../models/task')

// Create
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).send(task)
  } catch (err) {
    res.status(400).send(err)
  }
})

// Read All / Filter
router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.status) filter.status = req.query.status
    if (req.query.dueDate) filter.dueDate = new Date(req.query.dueDate)

    const tasks = await Task.find(filter)
    res.send(tasks)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Update
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) return res.status(404).send()
    res.send(task)
  } catch (err) {
    res.status(400).send(err)
  }
})

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).send()
    res.send({ message: 'Task deleted' })
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
