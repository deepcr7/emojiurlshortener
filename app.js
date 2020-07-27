const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const fs = require('fs');

const index = require('./routes/index')
const urls = require('./routes/urls')

const app = express();

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
fs.readdirSync(path.join(__dirname, '/models')).forEach((filename) => {
  require(path.join(__dirname, '/models/', filename));
});
mongoose.connect("mongodb://localhost:27017/urlshortener_apitrial", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("DB has been connected");
})

app.use('/', index)
app.use('/urls/', urls)


//Error Handling
app.use((req,res,next) =>
{
  const error = new Error("Not Found error");
  error.status = 404;
  next(error);
})

app.use((error,req,res,next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      message: error.message
    }
  })
})

module.exports = app;

