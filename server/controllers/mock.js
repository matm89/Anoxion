const cron = require('node-cron');
const Device = require('../model/devices');

/*
body:{
device:
status:
} */

//make a map of the task

const tasks = new Map();

async function toggleMock(req, res) {
  try {
    const {device, status} = req.body;
    console.log(device,status);
  
    if(!device || status == null || status === undefined) return res.status(400).json('🚨 device & status needed');
    
    let task = tasks.get(device);

    if (!task) { 
      //it is suppose to update the value each 30 sec
      task = cron.schedule('*/10 * * * * *', async () => {
        await Device.updateOne(
          { device },
          { $set: { "state.last_check": new Date().toISOString(),
            status:"running"
           } }
        );
      }, {scheduled: false , noOverlap:true});
      tasks.set(device,task);
    }

    if (task) {
      if (status == true) {
        task.start();
        await Device.updateOne(
          { device },
          { $set: { 
            "state.last_check": new Date().toISOString(),
           } }
        );
      } else if (status == false) {
        task.stop();
        await Device.updateOne(
          { device },
          { $set: { 
            "state.status": "stopped",
           } }
        );
      }
    }

    // the status is going to be idle on start because it is not sending at the moment just start the timmer
    res.status(200).json(await task.getStatus());

  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

module.exports = toggleMock;