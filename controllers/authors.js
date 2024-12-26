const router = require('express').Router()

const { Op } = require('sequelize')

const { Blog } = require('../models')
const { User } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
  console.log('authors')
  const result = await Blog.findAll(
    {
    group: 'author',
    attributes: ['author', [sequelize.fn('COUNT', sequelize.col('title')), 'blogs'], [sequelize.fn('SUM', sequelize.col('likes')), 'likes']],
    }
  )
  res.json(result)
})

module.exports = router