// app.js
// kmom05.
// a socket server for chat.


const express = require('express');
const app = express();
const PORT = 8000;

const server = require('http').createServer(app);
const io = require('socket.io')(server);

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
    
    socket.on('startChat', function(data) {
        console.log(data);
        io.emit('startChat', data);
    })

    socket.on('chatMessage', function(data) {
        console.log(data);
        io.emit('chatMessage', data)
    })

    socket.on('disconnect', () => {
        console.log("Disconnected!");
    })


});

// io.on('disconnect', (socket) => {
//     console.info("User disconnected.");

// })

server.listen(PORT, () => {
    console.log(`socket server listening on port ${PORT}!`);
});


