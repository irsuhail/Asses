const validateTask = (req, res, next) => {
  const { title, description, priority } = req.body
  const allowedPriorities = ['low', 'medium', 'high']

  if (!title || !description || !priority) {
    return res.status(400).json({ message: 'Incomplete Data Received' })
  }

  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({ message: 'Priority must be low, medium, or high' })
  }

  next()
}

module.exports = { validateTask }
