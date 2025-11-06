const { validationResult } = require('express-validator');
const Device  = require('../model/devices');
const User  = require('../model/users');

async function getDevices (req, res) {
try {
  //first check the result of the validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array()});

  //first we get the devices that each user have 
  const { email } = req.query;
  console.log(email);
  const user = await User.findOne({email: email});

  //then we get info of each device and make an array of them.
  const devices = await Device.find({device: {$in: user.devices}});

  res.status(200).send(devices);
} catch (error) {
  console.log(error);
  res.status(500).json('Internal Server Error');
}
}

//TODO postDevice?
function postDevice (req, res) {
try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array()});


} catch (error) {
  console.log(error);
  res.status(500).json('Internal Server Error');
}
}

module.exports = {getDevices, postDevice};