<!-- Test -->

<p align="center">
  <img src="Anoxion/public/logo1.png" alt="Anoxion Logo" width="160"/>
</p>

<h1 align="center">🧬 Anoxion – Anoxia Process Companion</h1>

<p align="center">
  <em>Monitor, control, and analyze anoxia treatment processes in real-time.</em><br>
  <a href="https://github.com/matm89/Anoxion">View Repository</a> • 
  <a href="#-installation">Installation</a> • 
  <a href="#-features">Features</a> • 
  <a href="#-todos--next-steps">TODO</a>
</p>

---

## 🌍 Overview

**Anoxion** is a full-stack web application designed to support the monitoring and control of *anoxia treatment processes* a method that removes oxygen from sealed chambers to treat art, food, or wooden artifacts. 

It provides real-time data visualization, device management, and automated alerts to ensure a successful and stable environment throughout the treatment process.

---

## 🚀 Tech Stack

### 🧩 Frontend
```

| Tech                                  | Purpose                         |
| ------------------------------------- | ------------------------------- | --------- |
| ⚛️ **React (Vite)**                   | UI framework                    |
| 🎨 **Tailwind CSS + MUI**             | Styling and components          |
| 📊 **Chart.js / Recharts / X-Charts** | Data visualization              |
| 🔔 **React Toastify**                 | Notifications                   |
| 🔐 **Auth Context (authStore)**       | Authentication state management |

```
---

### ⚙️ Backend
```
| Tech                         | Purpose                      |
| ---------------------------- | ---------------------------- | ---- |
| 🟢 **Node.js + Express**     | REST API server              |
| 🍃 **MongoDB + Mongoose**    | Data persistence             |
| 🔄 **WebSocket (Socket.io)** | Real-time data updates       |
| 🧱 **JWT Authentication**    | Secure access control        |
| 🧾 **MOCks aplications**     | Maded just for demo porpurse |
```
---

## ⚗️ How It Works

1. Each device sends data to the DB (O₂, humidity, temperature, etc.).
2. The backend obtain and process the data from MongoDB.
3. The frontend retrieves and visualizes the data in charts/ Give info of the state of the devices and make reports.
4. Users can monitor multiple devices and get alerts when thresholds are exceeded.

---

## 🧩 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/matm89/Anoxion.git
cd Anoxion

# Backend
cd server
npm install //install the dependencies
npm run dev //start the FE

# Backend
cd server
npm install //install the dependencies
npm nodemon //Start the BE

```

### 3️⃣ Create environment variables

```env
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret_key
WEBSOCKET_PORT=5001

create the 3 collections and import inside the mock data of each one stored in the server/db_mockdata
```

---

## 🧭 Features

```
✅ Multi-device management
✅ Real-time process visualization
✅ Data persistence in MongoDB
✅ WebSocket live data updates
❎ Secure login and authentication
✅ Custom alerts for thresholds
✅ Responsive and modern UI
```

---

## 🧱 Folder Structure

```bash
Anoxion/
├── client/               # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── ...
├── server/               # Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── index.js
└── README.md
```

---

## 🧰 TODOs & Next Steps

| Area             | Task                                  | Status         |
| ---------------- | ------------------------------------- | -------------- |
| 🔧 Backend       | Add authentification process          | 🔜 Planned     |
| ⚙️ Frontend      | Add process windows with reports      | 🔜 Planned     |
| ⚙️ Frontend      | Add User windows to change user info  | 🔜 Planned     |
| 📱 UI            | Improve mobile layout / darktheme     | 🔜 Planned     |
| 🔒 Security      | Add refresh token support Auto logout | 🔜 Planned     |
| 📡 Communication | Improve WebSocket reconnect handling  | ⏳ In progress |
| 🧑‍💻 FE,BE & DB    | Change getting process by email       | 🔜 Planned     | 


<!-- new addition -->
