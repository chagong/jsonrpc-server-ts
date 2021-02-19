import * as rpc from 'vscode-jsonrpc/node';
import WebSocket from 'ws';

const server = new WebSocket.Server({ port: 7919 });

server.on('connection', function connection(ws) {
  const webSocketStream = WebSocket.createWebSocketStream(
    ws, { decodeStrings: false}
  );

  const connection = rpc.createMessageConnection(
    new rpc.StreamMessageReader(webSocketStream),
    new rpc.StreamMessageWriter(webSocketStream)
  );

  const notification = new rpc.NotificationType<string>('testNotification');
  connection.onNotification(notification, (param: string) => {
    console.log(param);
  });

  connection.listen();
});

console.log("server started");
