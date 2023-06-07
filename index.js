import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, req) {

  ws.on('error', console.error);





  ws.on('message', function message(data, isBinary) {
    console.log('received: %s', data);
    let rsp = {};
    rsp.state = "message"
    rsp.data = data;
    rsp.isBinary = isBinary;
    ws.send(JSON.stringify(rsp));
    
  });

  let data = {};
  data.state = "connected"
  data.path = req.url;
  data.protocol = ws.protocol;
  data.subprotocol = ws.subprotocol;
  data.headers = req.headers;
  ws.send(JSON.stringify(data));
});