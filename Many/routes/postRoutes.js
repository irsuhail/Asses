const express = require('express')
const Post = require('../models/post')
const User = require('../models/user')
const router = express.Router()

router.post('/add-post', async (req, res) => {
  try {
    const { title, content, author } = req.body

    const user = await User.findById(author)
    if (!user) return res.status(400).send({ error: 'Invalid author ID' })

    const post = new Post({ title, content, author })
    await post.save()
    res.status(201).send(post)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email')
    res.send(posts)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

module.exports = router
