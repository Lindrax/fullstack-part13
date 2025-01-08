const router = require('express').Router()

const { Op } = require('sequelize')

const { User } = require('../models')
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {exclude: ['userId']}
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)

})

router.get('/:id', async (req, res) => {
  let read = {
    [Op.in]: [true, false]
  }
  if (req.query.read)
    read = req.query.read==='true'

  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'markedBlogs',
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt']},
      through: {
        attributes: ['id', 'read'],
        where: {
          read
        }
      },

    }
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username}})
  console.log(user)
  console.log(req.name)
  user.name = req.body.name
  user.save()
  res.json(user)
})

module.exports = router