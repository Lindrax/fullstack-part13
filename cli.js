require('dotenv').config()

const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {logging:false})

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    default: 0 
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

Blog.sync()

app.get('/api/blogs', async (req, res) => {
  console.log("war")
  try {
    const blogs = await Blog.findAll()
    return res.json(blogs)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

app.post('/api/blogs', async (req, res) =>  {
  console.log("what")
  try {
    console.log("test")
    console.log(req.body)
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  try {
    blog.destroy()
  } catch(error) {
    return res.status(400).json({error})
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/*const main = async () => {
  try {
    const [blogs] = await sequelize.query("SELECT * FROM blogs")
    blogs.forEach(blog => {
      console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`)
    })
    
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
*/