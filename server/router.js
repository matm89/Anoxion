const { getDevices, postDevice } = require('./controllers/devices');
const getProcess = require('./controllers/process');
const { validateUser, validateDevice } = require('./model/validators');

const router = require('express').Router();


//route to test if server is alive!
router.get('/', (req, res) => {
  res.status(200).send('Hello form server');
})

// Routing to devices db
router.get('/devices', validateUser, getDevices); //this get the email and return the devices asociated
router.post('/devices', validateDevice, postDevice); //this can include a new device to de db

// Routing to the process
router.get('/process', getProcess);


//!Routing to users (to implement in future versions)

module.exports = router;