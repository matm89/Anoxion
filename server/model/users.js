const mongoose = require('./index');


const usersSchema = new mongoose.Schema ({
  user: {type: String, required:true},
  email: {type: String, required:true},
  password: {type: String, required:true},
  devices:{type: Array}
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;