//server.js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

app.use(express.static('./public'));

io.on('connection', function(socket){
   console.log('connection');

  socket.on('CH01', function (from, msg) {
    console.log('client status', from, ' saying ', msg);
    io.sockets.emit('update', msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
