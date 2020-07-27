const db = require('./db')
const generateUrl= require('./generateUrl')

function shortenUrl(long){
  return new Promise((resolve, reject) => {
    db.findUrl(long)
      .then((dburl) => {
        if(dburl){
          return dburl.shortUrl;
        }
        const generatedUrl = generateUrl();
         return db.saveUrl({
           longUrl: long,
           shortUrl: generatedUrl
         }).then((newurl) => {
            return newurl.shortUrl
         })
      })
      .then((shortUrl) => {
        resolve(shortUrl)
      })
      .catch(reject)
  })
}

module.exports = {
  shortenUrl
}

