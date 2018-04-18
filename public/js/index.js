var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'Tom',
  //   text: 'How are you doing'
  // });

});

socket.on('newMessage', (message) => {
  console.log(message);
});

socket.on('disconnect', () => {
  console.log('Disonnected from server');
});

