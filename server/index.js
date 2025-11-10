'use strict'
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const PORT = 3000;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
  pingInterval: 25000,    // Send ping every 25 seconds
  pingTimeout: 60000,     // Wait 60 seconds for pong before closing
  transports: ['websocket', 'polling']
})

///handle socket connection
io.on("connection", (socket) => {
  console.log("📡 Client connected:", socket.id);
  socket.on("disconnect", () => console.log("❌ Client disconnected:", socket.id));
});

app.use(cors())
.use(bodyParser.json())
.use("/", (req,res,next) => {
  req.io = io; //attach the io to the req.
  next()
},router)
.use(router)
.use((req, res) =>{
  res.status(404).send('Page not found');
});


httpServer.listen(PORT,() => {
  console.log(`Server 🏃‍♂️‍➡️ on http://localhost:${PORT}`);
});

module.exports = io;