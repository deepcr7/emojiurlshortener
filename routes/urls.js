const express = require('express')
const shortenUrl = require('../functions/shortenUrl')
const db = require('../functions/db')
const validUrl = require('valid-url')

const router = express.Router();



//Create a new short url
router.post('/', (req,res,next) => {
    const longUrl = req.body.longUrl;
    if(!longUrl || !validUrl.isUri(longUrl)){
      res.send({ working: false })
      return;
    }
    shortenUrl.shortenUrl(longUrl)
    .then(result => res.send({
      working: true,
      result: result
    }))
    .catch(error => next(error))
})

module.exports = router


