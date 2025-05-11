const express = require('express')
const router = express.Router()
const Event = require('../models/Event')

// Create
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body)
    await event.save()
    res.status(201).send(event)
  } catch (err) {
    res.status(400).send(err)
  }
})

// Read all / filter by title
router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.title) filter.title = req.query.title
    const events = await Event.find(filter)
    res.send(events)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Update
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!event) return res.status(404).send()
    res.send(event)
  } catch (err) {
    res.status(400).send(err)
  }
})

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id)
    if (!event) return res.status(404).send()
    res.send({ message: 'Event deleted' })
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
