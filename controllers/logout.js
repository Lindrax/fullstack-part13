const router = require('express').Router()
const Sessions = require('../models/sessions')

const {tokenExtractor} = require('../util/middleware')

router.delete('/',tokenExtractor, async (req, res) => {
  await Sessions.destroy({ where: {userId: req.decodedToken.id}})
  res.status(200)
})

module.exports= router