//Express initialization

var baseExpress = require('express');
var express = baseExpress();
var http = require('http').createServer(express);
var io = require('socket.io').listen(http);
var path = require('path');

express.use('/res', baseExpress.static(path.join(global.app.baseDirectory, '/res')));
express.use('/test', baseExpress.static(path.join(global.app.baseDirectory, '/test')));
express.use('/node_modules', baseExpress.static(path.join(global.app.baseDirectory, '/node_modules')));

express.get('/', function (req, res) {
  
  console.log('>>>>>' + global.app.baseDirectory);

  var idxPath = path.join(global.app.baseDirectory, 'index.html') ;
  
  console.log('>>>>>' + idxPath);
  
  res.sendFile(idxPath);
});

io.on('connection', function (socket) {

  console.log('a user connected');

  if (global.app.server.callbacks.onSocketConnection)
    global.app.server.callbacks.onSocketConnection(socket);

  //socket.on('chat message', function (msg) {
  //  console.log('message: ' + msg);
  //  io.emit('chat message', msg);
  //});

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

http.listen(global.app.constants.__SERVER_PORT, function () {
  console.log('listening on *:' + app.constants.__SERVER_PORT);
});

global.app.server = {
  instance: express,
  express: baseExpress,
  io: io,
  http: http,
  callbacks: {
    onSocketConnection: null
  }
};