import { Devices } from '../devices/Devices';
import type { Device } from '../../types/device';

export function DeviceList({ devices }: { devices: Device[] }) {
  return (
    <>
      <h1 className="text-3xl font-bold text-brand-700 dark:text-brand-400 text-center my-10">
        Devices
      </h1>

      <div id="DeviceContainer" className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-5xl">
        {devices.map((d, i) => (
          <div
            key={i}
            id="deviceCard"
            className="device-card  bg-white/80 backdrop-blur-sm border border-brand-200 shadow-lg rounded-xl">
            <Devices device={d} />
          </div>
        ))}
      </div>
    </>
  );
}
