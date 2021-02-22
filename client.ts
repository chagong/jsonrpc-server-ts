import WebSocket from 'ws';
import * as rpc from 'vscode-jsonrpc/node';

const wsStream = WebSocket.createWebSocketStream(
  new WebSocket('ws://localhost:7919'),
  { decodeStrings: false }
);

const connection = rpc.createMessageConnection(
  new rpc.StreamMessageReader(wsStream),
  new rpc.StreamMessageWriter(wsStream)
);

const notification = new rpc.NotificationType<string>('testNotification');

connection.listen();

connection.sendNotification(notification, 'Hello World');
connection.sendNotification(notification, 'Hello2');

const request = new rpc.RequestType2<number, number, number, Error>('Add');

connection.sendRequest(request, 1, 2).then((result) => {
  console.log("ret = %d", result);
});


