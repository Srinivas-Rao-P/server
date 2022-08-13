require('dotenv').config()
const { authenticateToken } = require('../middlewares')
const express = require('express')
const router = express.Router()

const posts = [
  {
    username: 'srinivas',
    title: 'Post 1'
  },
  {
    username: 'Jim',
    title: 'Post 2'
  }
]

router.get('/', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})

module.exports = router;