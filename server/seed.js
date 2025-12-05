const mongoose = require('mongoose');
const process = require('process');
const path = require('path');
const fs = require('fs');

// Импортируем модели (убедись, что пути правильные)
const Device = require('./model/devices');
const User = require('./model/users');
const ProcessModel = require('./model/process');

// Подключение к БД
mongoose.connect('mongodb://localhost:27017/Anoxion')
  .then(() => console.log('🔌 Connected to DB for seeding'))
  .catch(err => console.error('🚨 Connection error:', err));

// 🛠️ ФУНКЦИЯ-ЧИСТИЛЬЩИК
// Превращает форматы MongoDB Export ($oid, $date) в нормальные данные
const cleanData = (data) => {
  return data.map(item => {
    const newItem = { ...item };

    // 1. Чиним ID: { "$oid": "..." } -> "..."
    if (newItem._id && newItem._id.$oid) {
      newItem._id = newItem._id.$oid;
    }

    // 2. Чиним Даты внутри state
    if (newItem.state && newItem.state.last_check && newItem.state.last_check.$date) {
      newItem.state.last_check = new Date(newItem.state.last_check.$date);
    }

    // 3. Чиним остальные даты (например, timestamp в процессах)
    for (const key in newItem) {
      if (newItem[key] && typeof newItem[key] === 'object' && newItem[key].$date) {
        newItem[key] = new Date(newItem[key].$date);
      }
    }

    return newItem;
  });
};

const seedDB = async () => {
  try {
    console.log('🚀 Starting seed script...');

    // clean old data
    await User.deleteMany({});
    await Device.deleteMany({});
    await ProcessModel.deleteMany({});
    console.log('🧹 DB Cleaned');

    const mockDir = path.join(process.cwd(), 'db_mockdata');

    // 2. looad users
    const usersPath = path.join(mockDir, 'users.json');
    if (fs.existsSync(usersPath)) {
      const raw = fs.readFileSync(usersPath);
      const usersData = JSON.parse(raw);
      await User.insertMany(cleanData(usersData));
      console.log(`✅ Imported ${usersData.length} users`);
    } else {
      console.log('⚠️ users.json not found');
    }

    // 3. load devices
    const devicesPath = path.join(mockDir, 'devices.json');
    if (fs.existsSync(devicesPath)) {
      const raw = fs.readFileSync(devicesPath);
      const devicesData = JSON.parse(raw);
      await Device.insertMany(cleanData(devicesData));
      console.log(`✅ Imported ${devicesData.length} devices`);
    } else {
      console.log('⚠️ devices.json not found');
    }

    // 4. load process
    const processesPath = path.join(mockDir, 'Anoxion.processes.json');
    if (fs.existsSync(processesPath)) {
      const raw = fs.readFileSync(processesPath);
      const processesData = JSON.parse(raw);
      await ProcessModel.insertMany(cleanData(processesData));
      console.log(`✅ Imported ${processesData.length} processes`);
    } else {
      console.log('⚠️ Anoxion.processes.json not found');
    }

  } catch (error) {
    console.error('🚨 Error seeding:', error);
  } finally {
    mongoose.connection.close();
    console.log('👋 Connection closed');
  }
};

seedDB();