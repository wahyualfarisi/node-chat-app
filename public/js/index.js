var socket = io();

socket.on('connect', function() {
  console.log('connected to server');

  socket.emit('createMessage', {
    to: 'wahyu@example.com',
    text: 'Hey anyone'
  });

});

socket.on('disconnect', function() {
  console.log('disconnect to server');
});

socket.on('newMessage', function(data){
  console.log(data)
});
