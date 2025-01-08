router = require('express').Router()

const { UserBlogs } = require('../models')
const { User } = require('../models')

const tokenExtractor = require('../util/middleware')

router.post('/', async (req, res) => {
  console.log(req.body.user_id)
  const result = await UserBlogs.create({userId: req.body.user_id, blogId: req.body.blog_id})
  res.json(result)
})

router.put('/:id',tokenExtractor, async (req, res) => {
  //const user = await User.findByPk(req.decodedToken.id)
  console.log
  const blog = await UserBlogs.findOne({ where: {userId: req.decodedToken.id, blogId: req.params.id}})
  console.log(blog)
  if (blog != null) {
    blog.read = true
    await blog.save()
    res.status(200).json(blog)
  } else {
    res.status(400).json('blog not found')
  }

})

module.exports = router