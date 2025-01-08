const router = require('express').Router()

const { Op } = require('sequelize')

const { Blog } = require('../models')
const { User } = require('../models')

const {tokenExtractor, checkSession} = require('../util/middleware')


const blogFinder = async(req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  let where = {}
  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`
          }
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`
          }
        }
      ]
    }

    }
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]

    
  })
  res.json(blogs)

})

router.post('/', tokenExtractor, async (req, res) =>  {
    const user = await User.findByPk(req.decodedToken.id)
    if (await checkSession(req.decodedToken.id)) {
      const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
      res.json(blog)
    } else {
      res.json('you do not have an active sessions')
    }
    
  
})

router.delete('/:id',blogFinder, tokenExtractor, async (req, res) => {
  if (req.blog) {
    if (await checkSession(req.decodedToken.id)) {
    if (req.blog.userId === req.decodedToken.id) {
      req.blog.destroy()
      res.json(req.blog)
    }
    else {
      return res.status(401).json({ error: 'Not your blog'})
    }
  } else {
    res.json('no active session')
  }
}
  else {
    return res.status(404).json({ error: 'Blog not found' })
  }
})

router.put('/:id', blogFinder, async(req, res) => {
  if (req.blog) {
      req.blog.likes = req.body.likes
      await req.blog.save()
      res.status(200).json(req.blog); 
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
})

module.exports = router