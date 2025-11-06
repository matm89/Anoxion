const mongoose = require('./index');


const processSchema = new mongoose.Schema ({
  "process_id": String,
  "user": String,
  "device": String,
  "timestamp": String,
  "state": String,
  "values": {
    "O2": Number,
    "temp": Number,
    "hum": Number
  },
  "iostate": {
    "n2_dry": Boolean,
    "n2_wet": Boolean,
    "start": Boolean,
    "stop": Boolean,
    "e-stop": Boolean
  }
});

const Process = mongoose.model('Processes', processSchema);

module.exports = Process;