import webSocket = require('ws');

const ws = new webSocket('ws://localhost:7919');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log(data);
});
