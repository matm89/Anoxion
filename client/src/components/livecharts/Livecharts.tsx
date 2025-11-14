import { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import type { LiveSample } from '../../types/live';
import { format } from 'date-fns';

// Register required components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
);

interface Props {
  processes: LiveSample[];
}

export function LiveCharts({ processes }: Props) {
  const o2ChartRef = useRef(null);
  const humChartRef = useRef(null);

  if (!processes || processes.length === 0) {
    return <div>No process data available</div>;
  }

  // Format timestamps for x-axis
  const formatedDate = processes.map((p) => format(new Date(p.timestamp), "do',' HH':'mm"));
  const oData = processes.map((p) => p.values.O2);
  const hData = processes.map((p) => p.values.hum);

  // Common chart options made by IA
  const baseOptions: ChartOptions<'line'> = {
    responsive: true,
    animation: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top' },
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { beginAtZero: false },
    },
  };

  // Dataset definitions
  const o2ChartData = {
    labels: formatedDate,
    datasets: [
      {
        label: 'O₂ (%)',
        data: oData,
        borderColor: '#2563eb',
        backgroundColor: '#3b82f6',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const humChartData = {
    labels: formatedDate,
    datasets: [
      {
        label: 'Humidity (%)',
        data: hData,
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.2)',
        fill: true,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  // Zoom control handlers
  interface ChartRef {
    current: InstanceType<typeof ChartJS> | null;
  }

  const resetZoom = (chartRef: ChartRef): void => {
    chartRef.current?.resetZoom();
  };

  return (
    <div className="grid grid-cols-1 gap-6 w-full max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-800 text-center mb-4">Process details</h1>

      {/* O₂ Chart */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-blue-700">O₂ Levels</h2>
          <button
            onClick={() => resetZoom(o2ChartRef)}
            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded">
            Reset Zoom
          </button>
        </div>
        <Line ref={o2ChartRef} data={o2ChartData} options={baseOptions} />
      </div>

      {/* Humidity Chart */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-green-700">Humidity</h2>
          <button
            onClick={() => resetZoom(humChartRef)}
            className="px-3 py-1 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded">
            Reset Zoom
          </button>
        </div>
        <Line ref={humChartRef} data={humChartData} options={baseOptions} />
      </div>
    </div>
  );
}
