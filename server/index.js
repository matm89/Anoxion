'use strict'
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors())
.use(bodyParser.json())
.use(router)
.use((req, res) =>{
  res.status(404).send('Page not found');
});

app.listen(PORT,() => {
  console.log(`Server 🏃‍♂️‍➡️ on http://localhost:${PORT}`);
});