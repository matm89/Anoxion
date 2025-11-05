const mongoose = require('./index');


const devicesSchema = new mongoose.Schema ({
  device: {type: String, required:true},
  state:{
    "e-stop": {type:Boolean, default:false},
    "connected": {type: Boolean,  default:false},
    "last_check": BigInt,
  }
});

const Devices = mongoose.model('Devices', devicesSchema);



module.exports = Devices;