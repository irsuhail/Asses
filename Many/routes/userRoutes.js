const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.post('/add-user', async (req, res) => {
  try {
    const { name, email, age } = req.body
    const user = new User({ name, email, age })
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

module.exports = router
