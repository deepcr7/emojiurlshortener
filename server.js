const app = require('./app')
const http = require('http')

const PORT = 3000;
app.set('PORT',PORT)

const server = http.createServer(app)

server.listen(PORT)
server.on('listening', onRunning)

function onRunning() {
  console.info("Server is running on port 3000")
}

