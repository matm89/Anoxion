const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Anoxion');
}

// Only connect if not in test mode
if (process.env.NODE_ENV !== 'test') {
  main()
    .then(() => console.log('🔌 to DB 👍'))
    .catch((error) => console.log('🚨 Imposible to connect with DB', error));
}

module.exports = mongoose;
