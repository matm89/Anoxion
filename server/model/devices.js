const mongoose = require('./index');


const devicesSchema = new mongoose.Schema ({
  device: {type: String, required:true},
  state:{
    "e-stop": {type:Boolean, default:false},
    "status": {type: String,  default:false},
    "last_check": Date,
  }
});

const Devices = mongoose.model('Devices', devicesSchema);



module.exports = Devices;