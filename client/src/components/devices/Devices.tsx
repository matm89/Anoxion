import { useState } from 'react';
import type { Device, DeviceMock } from '../../types/device';
import { toggleMock, toggleProcess } from '../../services/mock';

export function Devices({ device }: { device: Device }) {
  const [state, setState] = useState(false);
  const [statusProcess, setStatusProcess] = useState(false);

  // mocks functions for demo
  async function startMock(device: Device) {
    try {
      const mock: DeviceMock = {
        device: device.device,
        state: state,
      };
      if (!state) {
        setState(true);
        await toggleMock(mock);
      } else {
        setState(false);
        await toggleMock(mock);
      }
    } catch (error) {
      console.log('error during start Device_Mock:', error);
    }
  }

  // now props are immutabel
  async function startProcess(device: Device) {
    try {
      const updatedDevice: Device = {
        ...device,
        state: {
          ...device.state,
          status: statusProcess ? 'stopped' : 'running',
        },
      };

      setStatusProcess(!statusProcess);
      await toggleProcess(updatedDevice);
    } catch (error) {
      console.log('error during start Process_Mock:', error);
    }
  }

  const OFFLINE_THRESHOLD_MIN = 1; //! 10 mins in development used 1 to test

  const now = new Date();
  //check if it was online the last minute
  const isOffline = (lastCheck: Date): boolean => {
    if (!lastCheck) return true;
    const diff = now.getTime() - new Date(lastCheck).getTime();
    const minutes = diff / 1000 / 60;
    return minutes > OFFLINE_THRESHOLD_MIN;
  };

  const offline = isOffline(device.state.last_check);

  function removeNestedStatus(status: string) {
    const result = [
      'bg-green-100 text-green-700',
      'bg-yellow-100 text-yellow-700',
      'bg-gray-100 text-gray-700',
    ];

    if (status === 'running') {
      return result[0];
    } else if (status === 'stopped') {
      return result[1];
    } else {
      return result[2];
    }
  }
  return (
    <div className="flex flex-col gap-3 w-full p-4">
      <div
        key={device.device}
        className={`flex items-center justify-between p-4 border-4 rounded-xl shadow-md 
              transition-colors duration-300
              ${offline ? 'bg-red-100 border-red-400' : 'bg-green-50 border-green-300'}`}>
        {/* Name */}
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-blue-900">{device.device}</span>
          <span
            onClick={() => startMock(device)}
            className={`text-sm ${offline ? 'text-red-500' : 'text-blue-700'}`}>
            {offline ? 'Offline' : 'Connected'}
          </span>
        </div>

        {/* Status */}
        <div
          onClick={() => startProcess(device)}
          className={`text-sm font-medium px-3 py-1 rounded-full 
              ${removeNestedStatus(device.state.status)}`}>
          {device.state.status}
        </div>

        {/* E-Stop */}
        {device.state.status === 'running' ? (
          <button
            onClick={() => startProcess(device)}
            className="rounded-full text-white p-1 bg-red-500 border-2 border-black ">
            E-Stop
          </button>
        ) : null}
        {/* last Connection */}
        <div className="text-xs text-gray-500 text-right">
          {device.state.last_check ? new Date(device.state.last_check).toLocaleTimeString() : '—'}
        </div>
      </div>
    </div>
  );
}
