import { toast } from 'react-toastify';
import { type Device, type DeviceMock } from '../types/device';
import { useEffect, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import type { LiveSample } from '../types/live';

const apiUrl = 'http://localhost:3000';

export async function toggleMock(device: DeviceMock) {
  try {
    const msg = {
      device: device.device,
      status: device.state,
    };

    const response = await fetch(`${apiUrl}/mock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(msg),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    toast.error('🚨 occurs during on post mocks', {
      icon: () => <img src="/icon.png" width={20} />,
    });
  }
}

export async function toggleProcess(device: Device) {
  try {
    const response = await fetch(`${apiUrl}/mock/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(device),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    toast.error('🚨 occurs during on post mocks', {
      icon: () => <img src="/icon.png" width={20} />,
    });
  }
}

export function useLiveData() {
  const [data, setData] = useState<LiveSample[]>([]); // ⬅️ Было Process[], теперь правильно

  const [socket] = useState<Socket>(() =>
    io(`${apiUrl}`, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
      rejectUnauthorized: false,
    }),
  );

  useEffect(() => {
    const handleProcessData = (payload: LiveSample) => {
      setData((prev) => [...prev.slice(-99), payload]);
    };

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('⚠️ Connection error:', error);
    });

    socket.on('process-data', handleProcessData);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('process-data', handleProcessData);
    };
  }, [socket]);

  return data;
}
