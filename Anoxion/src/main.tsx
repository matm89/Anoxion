import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import { io } from 'socket.io-client'

// Initialize Socket.IO connection helped by IA to fix the connection
const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

socket.on('connect', () => {
  console.log('✅ Connected to server:', socket.id);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error);
});

socket.on('disconnect', () => {
  console.log('⚠️ Disconnected from server');
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
