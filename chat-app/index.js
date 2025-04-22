const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = {}; 
const rooms = {}; 

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    users[socket.id] = username;
    socket.join(room);
    rooms[room] = rooms[room] || [];
    rooms[room].push(socket.id);

    socket.to(room).emit('notification', `${username} joined the room.`);
  });

  socket.on('chatMessage', ({ room, message }) => {
    io.to(room).emit('message', { user: users[socket.id], text: message });
  });

  socket.on('privateMessage', ({ toSocketId, message }) => {
    socket.to(toSocketId).emit('privateMessage', {
      from: users[socket.id],
      text: message,
    });
  });

  socket.on('typing', ({ room, isTyping }) => {
    socket.to(room).emit('typing', { user: users[socket.id], isTyping });
  });

  socket.on('disconnect', () => {
    const username = users[socket.id];
    for (const room in rooms) {
      rooms[room] = rooms[room].filter(id => id !== socket.id);
      io.to(room).emit('notification', `${username} left the room.`);
    }
    delete users[socket.id];
  });
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
