const path     = require('path');
const http     = require('http');
const socketIO = require('socket.io');
const express  = require('express');
const app      = express();
const publicPath = path.join(__dirname, '../public');
const port       = process.env.PORT || 3000;


//create server
const server     = http.createServer(app)
const io         = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user is connected');

  socket.on('connect', (connect) => {
    console.log('connected to server');
  })

  socket.on('disconnect', (socket) => {
    console.log('disconnect to server');
  })

})



server.listen(port, () => {
  console.log('is listening on port ', port)
});
