// app.js
// kmom05.
// a socket server for chat.


const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// mongodb
const mongo = require('mongodb').MongoClient;
const dsn = 'mongodb://localhost:27017/chat';

app.use(cors());
io.origins(['https://jeneljenel.me:443', 'http://localhost:3000']);

io.on('connection', (socket) => {
    console.log("Connection established!");
    console.log(socket.id);

    socket.on('GET_CHATLOG', function () {
        console.log("get_chatlog")
        getData(dsn, 'chatMess')
            .then(res => io.emit('RECEIVE_CHATLOG', res))
            .catch(err => console.log(err));
    })

    socket.on('SEND_MESSAGE', function (data) {
        insertData(dsn, 'chatMess', data);
        io.emit('RECEIVE_MESSAGE', data);
    })

    socket.on('JOIN_CHAT', function (data) {
        insertData(dsn, 'chatMess', data);
        io.emit('ENTER_CHAT', data);
    })
    
    socket.on('LEAVE_CHAT', function(data) {
        // deleteData(dsn, 'chatMess');
        io.emit('EXIT_CHAT', data);
    }

    )
    socket.on('disconnect', () => {
        console.log("Disconnected!");
    })


});

async function getData(dsn, chatMess) {
    const client = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(chatMess);
    const res = await col.find().toArray();
    console.log("the res: " + res)

    for (let index = 0; index < res.length; index++) {
        console.log(res[index]);
    }

    await client.close();

    return res;
}

async function insertData(dsn, chatMess, data) {
    const client = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(chatMess);
    await col.insertOne(data);

    await client.close();
}

async function deleteData(dsn, chatMess, data) {
    const client = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(chatMess);
    await col.deleteMany(data);

    await client.close();
}

server.listen(PORT, () => {
    console.log(`socket server listening on port ${PORT}!`);
});


