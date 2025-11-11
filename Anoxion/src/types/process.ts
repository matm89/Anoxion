export interface Process {
  process_id:string,
  timestamp:string,
  user: string,
  device: string,
  state:"running" | "stopped" | string,
  result:"in_progress" | string,
  values:{
    O2:number,
    temp:number,
    hum: number
  },
  iostate: {
    n2_dry:boolean,
    n2_wet:boolean,
    start:boolean,
    stop: boolean,
    "e-stop": boolean
  },
};

export interface ProcessProps {
  processList: Array<string | number>;
  processes: Process[];
}

// Common chart options
export interface BaseOptions {
  responsive: boolean,
  animation: boolean,
  interaction: { 
    mode: 'index' | string, 
    intersect: boolean },
  plugins: {
    legend: { position: 'top' | string},
    zoom: {
      zoom: {
        wheel: { enabled: boolean },
        pinch: { enabled: boolean },
        mode: 'x' | string,
      },
      pan: {
        enabled: boolean,
        mode: 'x' | string,
      },
    },
  },
  scales: {
    x: { title: { 
          display: boolean, 
          text: 'Time' | string 
        } 
      },
    y: { beginAtZero: boolean },
  },
};