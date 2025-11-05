const { validationResult } = require("express-validator");
const Process = require("../model/process");

async function getProcess (req, res) {
try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array()});

  const {user} = req.body;
  console.log(user);
  const process = await Process.find({user:user});
  console.log(process);
  res.status(200).send(process);

} catch (error) {
  console.log(error);
  res.status(500).json('Internal Server Error');
}
}

module.exports = getProcess ;