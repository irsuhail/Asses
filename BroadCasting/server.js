const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.static('public'));


io.on('connection', (socket) => {
    console.log('a user connected');

    
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);
        
        io.emit('chat message', msg);
    });

    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(3000, () => {
    console.log('Server running on port 3000');
});
