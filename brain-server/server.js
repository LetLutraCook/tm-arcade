const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let latest = { label: "none", confidence: 0 };

wss.on("connection", (ws) => {
  ws.send(JSON.stringify(latest));

  ws.on("message", (msg) => {
    latest = JSON.parse(msg);

    wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(latest));
      }
    });
  });
});