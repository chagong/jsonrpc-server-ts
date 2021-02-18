import * as webSocket from 'ws';

const server = new webSocket.Server({ port: 7919 });

server.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

console.log("server started");
