const { validationResult } = require('express-validator');
const Device = require('../model/devices');
const User = require('../model/users');

async function getDevices(req, res) {
  try {
    //first check the result of the validation
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });

    //first we get the devices that each user have
    const { email } = req.query;
    const user = await User.findOne({ email });

    // Bug fix: when the user was not found, the server crashed.

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        devices: [],
      });
    }

    // find devices owned by user
    const devices = await Device.find({
      device: { $in: user.devices || [] },
    });

    return res.status(200).json(devices);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
}

//TODO postDevice?
function postDevice(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
}

module.exports = { getDevices, postDevice };
