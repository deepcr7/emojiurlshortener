const express = require('express')
const router = express.Router();

const db = require('../functions/db')



router.get('/:id', (req,res,next) => {
  const id = req.params.id
  const originalurl = `http://localhost:3000/${id}`;
  console.log(originalurl)
  db.findLongUrl(originalurl)
  .then(data => {
    if(!data){
      next();
      return;
    }
    res.writeHead(301, {
      Location: data.longUrl
    });
    res.end();
  })
  .catch(error => next(error));
});

module.exports = router; 

