const { validationResult } = require("express-validator");
const Process = require("../model/process");

async function getProcess (req, res) {
try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array()});

  const { user } = req.query;
  console.log(user);

  const processes = await Process.aggregate([
    { $match: { user: user } },
    { $group: { _id: "$process_id", items: { $push: "$$ROOT" } } },
    { $sort: { _id: 1 } },
    { $group: { _id: null, ids: { $push: "$_id" }, groups: { $push: "$items" } } },
    { $project: { _id: 0, result: ["$ids", "$groups"] } }
  ]);

  res.status(200).send(processes[0].result);

} catch (error) {
  console.log(error);
  res.status(500).json('Internal Server Error');
}
}

module.exports = getProcess ;