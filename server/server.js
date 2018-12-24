const path              = require('path');
const http              = require('http');
const socketIO          = require('socket.io');
const express           = require('express');
const app               = express();
const publicPath        = path.join(__dirname, '../public');
const port              = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message');

//create server
const server            = http.createServer(app)
const io                = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user is connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));



  socket.on('createMessage', (message, callback) => {
    console.log('message', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('this is your message');
  });



  //disconnect users
  socket.on('disconnect', (socket) => {
    console.log('disconnect to server');
  });
});



server.listen(port, () => {
  console.log('is listening on port ', port)
});
