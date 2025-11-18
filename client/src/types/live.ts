export interface LiveSample {
  timestamp: string | number;
  values: {
    O2: number;
    temp: number;
    hum: number;
  };
  process_id?: string;
  user?: string;
  device?: string;
  result?: string;
  state?: string;
  iostate?: {
    n2_dry: boolean;
    n2_wet: boolean;
    start: boolean;
    stop: boolean;
    'e-stop': boolean;
  };
}
