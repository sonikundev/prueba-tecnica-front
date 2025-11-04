import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import { setupWebSocket } from './websocket/socket.js';

dotenv.config();

const server = http.createServer(app);
setupWebSocket(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
