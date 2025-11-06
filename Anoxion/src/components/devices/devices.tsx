import type { Device } from "../../types/device";


interface DevicesProps {
  devices: Device[];
}

export function Devices({ devices }: DevicesProps) {

  const now = new Date();

  const isOffline = (last_check: string): boolean => {
    if (!last_check) return true;
    const diff = now.getTime() - new Date(last_check).getTime();
    const minutes = diff / 1000 / 60;
    return minutes > 10;
  };

  return (
    <div className="flex flex-col gap-3 w-full p-4">
      {devices.map((device) => {
        const offline = isOffline(device.state.last_check);

        return (
          <div
            key={device.device}
            className={`flex items-center justify-between p-4 rounded-xl shadow-md border 
              transition-colors duration-300 
              ${
                offline
                  ? "bg-red-50 border-red-400"
                  : "bg-blue-50 border-blue-300"
              }`}
          >
            {/* Name */}
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-blue-900">
                {device.device}
              </span>
              <span
                className={`text-sm ${
                  offline ? "text-red-500" : "text-blue-700"
                }`}
              >
                {offline ? "Offline" : "Connected"}
              </span>
            </div>

            {/* Status */}
            <div
              className={`text-sm font-medium px-3 py-1 rounded-full 
              ${
                device.state.state === "running"
                  ? "bg-green-100 text-green-700"
                  : device.state.state === "stopped"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {device.state.state}
            </div>

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