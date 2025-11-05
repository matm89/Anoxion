const mongoose = require ('mongoose');

main()
.then(() => (console.log('🔌 to DB 👍')))
.catch( error => (console.log('🚨 Imposible to connect with DB', error)));

async function main () {
  await mongoose.connect('mongodb://localhost:27017/Anoxion')
}

module.exports = mongoose;