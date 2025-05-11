const express = require('express')
const router = express.Router()
const {
  createTask,
  getTasks,
  updateTask,
  deleteTasks
} = require('../controllers/task.controller')

const { validateTask } = require('../middleware/task.middleware')

router.post('/', validateTask, createTask)
router.get('/', getTasks)
router.patch('/:id', validateTask, updateTask)
router.delete('/', deleteTasks)

module.exports = router
