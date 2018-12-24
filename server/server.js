const path       = require('path');
const http       = require('http');
const socketIO   = require('socket.io');
const express    = require('express');
const app        = express();
const publicPath = path.join(__dirname, '../public');
const port       = process.env.PORT || 3000;


//create server
const server     = http.createServer(app)
const io         = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user is connected');

  socket.emit('newMessage', {
    from : 'Admin',
    text: 'Welcome to the chat app'
  })

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User Joined',
    createAt: new Date().getTime()
  })

  

  socket.on('createMessage', (message) => {
    console.log('message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime()
    });
  })

  socket.on('disconnect', (socket) => {
    console.log('disconnect to server');
  })

})



server.listen(port, () => {
  console.log('is listening on port ', port)
});
