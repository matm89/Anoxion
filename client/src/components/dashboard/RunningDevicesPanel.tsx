import type { Device } from '../../types/device';
import { ActiveProcess } from '../activeprocess/ActiveProcess';

export function RunningDevicesPanel({ devices }: { devices: Device[] }) {
  const running = devices.filter((d) => d.state.status === 'running');

  if (running.length === 0) return null;

  return (
    <>
      <h2 className="text-3xl font-bold text-brand-700 dark:text-brand-400 m-10">
        Live Data Stream
      </h2>

      <div
        id="LiveContainer"
        className="w-full flex flex-col sm:flex-row max-w-5xl bg-white/90 backdrop-blur-sm border border-brand-200 shadow-lg rounded-xl">
        {running.map((d, i) => (
          <div key={i} className="p-2 w-full border-t border-gray-200">
            <h3 className="font-bold text-brand-600 mb-2">{d.device}</h3>
            <ActiveProcess />
          </div>
        ))}
      </div>
    </>
  );
}
