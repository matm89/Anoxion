'use strict';
const express = require('express');
const router = require('./router');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
// const PORT = 3000;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: '*' },
  pingInterval: 25000, // Send ping every 25 seconds
  pingTimeout: 60000, // Wait 60 seconds for pong before closing
  transports: ['websocket', 'polling'],
});

///handle socket connection
io.on('connection', (socket) => {
  console.log('📡 Client connected:', socket.id);
  socket.on('disconnect', () =>
    console.log('❌ Client disconnected:', socket.id)
  );
});

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.io = io; //attach the io to the req.
  next();
});
app.use('/', router);
app.use((req, res) => {
  res.status(404).send('Page not found');
});

if (require.main === module) {
  const PORT = 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server 🏃‍♂️‍➡️ on http://localhost:${PORT}`);
  });
}

module.exports = app;
