import { useState } from "react";
import type { Device, DeviceMock, DevicesProps } from "../../types/device";
import { toggleMock, toggleProcess } from "../../services/mock";


export function Devices({ devices, }: DevicesProps) {
  
  const [state, setState] = useState(false);
  const [statusProcess, setStatusProcess] = useState(false);
  
  // mocks functions for demo
  async function startMock(device: Device) {
    try {
      const mock: DeviceMock = {
        device:device.device,
        state:state
      }
      if (!state) {
        setState(true);
        await toggleMock(mock);
      } else {
        setState(false);
        await toggleMock(mock);
      }
      
    } catch (error) {
      console.log('error during start Device_Mock:',error);
    }
  };

  async function startProcess (device: Device) {
    try {
      if(!statusProcess){
        setStatusProcess(true);
        device.state.status = "running";
        await toggleProcess(device);
      } else {
        setStatusProcess(false);
        device.state.status = "stopped";
        await toggleProcess(device);
      }
    } catch (error) {
      console.log('error during start Process_Mock:',error);
    }
  }

  const now = new Date();
  //check if it was online the last minute
  const isOffline = (last_check: Date): boolean => {
    if (!last_check) return true;
    const diff = now.getTime() - new Date(last_check).getTime();
    const minutes = diff / 1000 / 60;
    return minutes > 1;
  };

  return (
    <div className="flex flex-col gap-3 w-full p-4">
      {devices.map((device) => {
        const offline = isOffline(device.state.last_check);

        return (
          <div
            key={device.device}
            className={`flex items-center justify-between p-4 border-4 rounded-xl shadow-md 
              transition-colors duration-300 border
              ${
                offline
                  ? "bg-red-100 border-red-400"
                  : "bg-green-50 border-green-300"
              }`}
          >
            {/* Name */}
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-blue-900">
                {device.device}
              </span>
              <span
                onClick={() => startMock(device)}
                className={`text-sm ${
                  offline ? "text-red-500" : "text-blue-700"
                }`}
              >
                {offline ? "Offline" : "Connected"}
              </span>
            </div>

            {/* Status */}
            <div
              onClick={() => startProcess(device)}
              className={`text-sm font-medium px-3 py-1 rounded-full 
              ${
                device.state.status === "running"
                  ? "bg-green-100 text-green-700"
                  : device.state.status === "stopped"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {device.state.status}
            </div>

            {/* E-Stop */}
            {device.state.status === "running"
              ?<button className="rounded-full bg-color:red " >E-Stop</button>
              : null
            }
            {/* last Connection */}
            <div className="text-xs text-gray-500 text-right">
              {device.state.last_check
                ? new Date(device.state.last_check).toLocaleTimeString()
                : "—"}
            </div>
          </div>
        );
      })}
    </div>
  );
}