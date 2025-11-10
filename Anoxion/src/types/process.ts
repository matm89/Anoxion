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