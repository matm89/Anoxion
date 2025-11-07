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
    <div className="flex flex-col w-[100%]">
      <div className="flex flex-row gap-3 w-[100%]  border-4 place-items-center">
      {processList &&
        processList.map((proc) => (
          <div
            key={String(proc)}
            className=" device-card w-[10vw] place-items-center bg-white/80 backdrop-blur-sm border border-brand-200 shadow-lg rounded-xl p-4"
          >
            {/* Name */}
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-blue-900">{proc}</span>
            </div>
            {/* Details button*/}
            <button
              onClick={() => handleDetails(proc)}
              className="relative p-1 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Details
              </span>
            </button>
        </div>
        ))
        }
      </div>

      <div>

      {/* Render details for the selected process */}
      {selectedProcess !== null && (
        <ProcessDetails processes={processes.flat().filter((p) => p.process_id == selectedProcess)} />
      )}

      </div>
    </div>
  );
}