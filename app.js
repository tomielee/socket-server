// app.js
// kmom05.
// a socket server for chat.


const express = require('express');
const app = express();
const PORT = 8000;

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.origins(['https://jeneljenel.me:443']);
// io.origins(['http//localhost:3000']);


io.on('connection', (socket) => {
    console.log("Connection established!")

    socket.on('SEND_MESSAGE', function (data) {
        console.log(data);
        io.emit('RECEIVE_MESSAGE', data);
    })

    socket.on('JOIN_CHAT', function (data) {
        console.log(data);
        io.emit('ENTER_CHAT', data);
    })
    
    socket.on('LEAVE_CHAT', function(data) {
        io.emit('EXIT_CHAT', data);
    }

    )
    socket.on('disconnect', () => {
        console.log("Disconnected!");
    })


});

server.listen(PORT, () => {
    console.log(`socket server listening on port ${PORT}!`);
});


