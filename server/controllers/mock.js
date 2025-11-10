const cron = require('node-cron');
const Device = require('../model/devices');

//make a map of the task

const tasks = new Map();
let intervals = {};

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

async function toggleProcess (req, res) {
  try {
    const {device, state} = req.body;
    if (state.status == "stopped"){
        await Device.updateOne(
          { device },
          { $set: {
            "state.status":"running"
           } }
        );
        state.status = "running";
    } else {
      await Device.updateOne(
        { device },
        { $set: { 
          "state.status":"stopped"
         } }
      );
      state.status = "stopped";
    }
    // Start or stop live mock stream
    if (state.status === "running") {
      // Start stream if not already running
      if (!intervals[device]) {
        console.log("▶️ Starting mock stream for", device);
        intervals[device] = setInterval(() => {
          const data = {
            process_id:"P004",
            timestamp: new Date().toISOString(),
            user: "Miguel",
            device:device,
            result:"in_progress",
            values: {
              O2: (Math.random() * 21).toFixed(2),
              temp: (20 + Math.random() * 5).toFixed(1),
              hum: (40 + Math.random() * 10).toFixed(1),
            },
          };
          req.io.emit("process-data", data);
        }, 1000);
      }
    } else {
      // Stop stream
      if (intervals[device]) {
        console.log("⏹️ Stopping mock stream for", device);
        clearInterval(intervals[device]);
        delete intervals[device];
      }
    }
    res.status(200).json('Status changed');
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
}





module.exports = {toggleMock, toggleProcess};