const router = require('express').Router()

const { Blog } = require('../models')
const { User } = require('../models')

const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const blogFinder = async(req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name']
      }
    })
  res.json(blogs)

})

router.post('/', tokenExtractor, async (req, res) =>  {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
  res.json(blog)
})

router.delete('/:id',blogFinder, tokenExtractor, async (req, res) => {
  if (req.blog) {
    if (req.blog.userId === req.decodedToken.id) {
      req.blog.destroy()
      res.json(req.blog)
    }
    else {
      return res.status(401).json({ error: 'Not your blog'})
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