**Socket server**
Är en realtidsserver.

Vi har en 
    *socket.io* själva servern.
    *socket.io-client* själva klienten.

Klienten implementeras i nuvarande me-sida.
Servern sätts upp separat.


**Servern**

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

