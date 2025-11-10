const { getDevices, postDevice } = require('./controllers/devices');
const toggleMock = require('./controllers/mock');
const getProcess = require('./controllers/process');
const { validateUser, validateDevice, validateMail } = require('./model/validators');

const router = require('express').Router();


//route to test if server is alive!
router.get('/', (req, res) => {
  res.status(200).send('Hello form server');
})

// Routing to devices db
router.get('/devices', validateMail, getDevices);
router.post('/devices', validateDevice, postDevice);

// Routing to the process
router.get('/process', validateUser, getProcess);

// Routing to mocks
router.post('/mock',toggleMock);
// router.post('/mock/process')

//!Routing to users (to implement in future versions)

module.exports = router;