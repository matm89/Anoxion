export interface Device {
  device: string;
  state: {
    "e-stop": boolean;
    state: "running" | "stopped" | string;
    last_check: string; 
  };
}