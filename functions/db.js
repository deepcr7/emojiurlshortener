const mongoose = require('mongoose')
const url = require('../models/shortUrl')


function findUrl(long){
  return url.findOne({longUrl: long})
}

function findLongUrl(short){
  return url.findOne({shortUrl: short})
}

function saveUrl(long){
  const newUrl = new url(long);
  return newUrl.save();
}

module.exports = {
       findUrl,
       findLongUrl,
       saveUrl
};

