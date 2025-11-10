import { toast } from "react-toastify";
import {type Device, type DeviceMock}  from "../types/device";
import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import type { Process } from "motion/react";

const apiUrl = 'http://localhost:3000';


export async function toggleMock (device: DeviceMock) {
  try {
    
    const msg = {
      device:device.device,
      status:device.state
    };

    const response = await fetch(`${apiUrl}/mock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(msg),
    });
    const result = await response.json();
    console.log(result);
    return result;

  } catch (error) {
    console.log(error);
    toast.error('🚨 occurs during on post mocks',{
      icon: () => <img src="/icon.png" width={20}/>
    });
  }
}

export async function toggleProcess(device:Device) {
  try {
    const response = await fetch(`${apiUrl}/mock/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(device),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    toast.error('🚨 occurs during on post mocks',{
      icon: () => <img src="/icon.png" width={20}/>
    });
  }
}

export function useLiveData() {
  const [data, setData] = useState<Process[]>([]);
  const [socket] = useState<Socket>(() => io(`${apiUrl}`));

  useEffect(() => {
    socket.on("process-data", (payload: Process) => {
      setData((prev) => [...prev.slice(-99), payload]);
      console.log('socket on');
    });

    return () => {
      socket.off("process-data");
      socket.disconnect();
    };
  }, [socket]);

  return data;
}
