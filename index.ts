import * as rpc from 'vscode-jsonrpc/node';
import WebSocket from 'ws';

const server = new WebSocket.Server({ port: 7919 });

server.on('connection', function connection(ws) {
  console.log("connected");
  ws.on("message", message => {
    console.log("ws:" + message);
  });

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

  const request = new rpc.RequestType2<number, number, number, Error>("Add");
  connection.onRequest(request, (p1: number, p2: number) => {
    console.log("on request add: %s+ %s", p1, p2);
    return (p1 + p2);
  });

  connection.listen();
});

server.on("close", function close() {
  console.log("closed");
});

console.log("server started");
