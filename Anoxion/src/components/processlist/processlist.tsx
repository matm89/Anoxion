import { useState } from "react";
import type { Process } from "../../types/process";
import { ProcessDetails } from "../processdetails/processdetails";

interface ProcessProps {
  processList: Array<string | number>;
  processes: Process[];
}

export function ProcessList({ processList, processes }: ProcessProps) {
  const [selectedProcess, setSelectedProcess] = useState<string | number | null>(null);

  // Set the selected process id to render details below
  function handleDetails(processItem: string | number) {
    setSelectedProcess(processItem);
  }

  return (
    <div className="flex flex-col w-full items-center">
      {/* items rows */}
      <div
        id="processNames"
        className="flex flex-row flex-wrap justify-center items-center gap-4 w-full py-4 border-gray-200 rounded-xl "
      >
        {processList &&
          processList.map((proc) => (
            <div
              key={String(proc)}
              className="device-card flex flex-col items-center justify-between w-[10vw] min-w-[140px] bg-white/80 backdrop-blur-sm border border-brand-200 shadow-lg rounded-xl p-4"
            >
              {/* Name */}
              <span className="text-lg font-semibold text-blue-900">
                {proc}
              </span>
  
              {/* Details button */}
              <button
                onClick={() => handleDetails(proc)}
                className="mt-3 relative px-4 py-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 hover:from-green-500 hover:to-blue-700 text-white transition-all duration-150 focus:ring-2 focus:ring-green-300"
              >
                <span className="relative">Details</span>
              </button>
            </div>
          ))}
      </div>
  
      {/* === PROCESS DETAILS ROW === */}
      <div
        id="processDetails"
        className="w-full mt-6 px-4 flex justify-center"
      >
        {selectedProcess !== null && (
          <div className="w-full max-w-6xl">
            <ProcessDetails
              processes={processes.flat().filter(
                (p) => p.process_id == selectedProcess
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}