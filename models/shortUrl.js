const mongoose = require('mongoose')

const Schema = mongoose.Schema

const urlSchema = new Schema({
  longUrl:{
    type:String,
    required: true
  },
  shortUrl:{
    type: String,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model('url', urlSchema)

