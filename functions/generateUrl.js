const emoji = require('node-emoji')

const baseUrl = 'http://localhost:3000/';

function r() {
  return emoji.random().emoji;
}

module.exports = () => {
  return `${baseUrl}${r()}${r()}${r()}${r()}${r()}`;
}

