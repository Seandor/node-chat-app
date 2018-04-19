require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const port = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  socket.emit('newMessage', generateMessage('System', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('System', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    // broadcast the massage to all users
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('System', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started server on port ${port}`);
});

module.exports = { server };
