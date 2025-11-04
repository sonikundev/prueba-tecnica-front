import { WebSocketServer } from 'ws';

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('Cliente conectado al WebSocket');

    ws.on('message', (message) => {
      console.log('Mensaje recibido:', message.toString());

      wss.clients.forEach(client => {
        if (client.readyState === ws.OPEN) {
          client.send(`Echo: ${message}`);
        }
      });
    });

    ws.on('close', () => console.log('Cliente desconectado'));
  });
};
