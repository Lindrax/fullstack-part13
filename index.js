
const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json(  err.message );
});

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()