const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const Sessions = require('../models/sessions')


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

const checkSession = async (id) => {
  const token = await Sessions.findOne({where: {user_id: id}})
  console.log('session',token)
  if (token != null) {
    console.log('tosi')
    return true
  } else {
    console.log('ei')
    return false
  }
}

module.exports ={ tokenExtractor, checkSession}