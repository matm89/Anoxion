export interface LiveSample {
  timestamp: string | number;
  values: {
    O2: number;
    temp: number;
    hum: number;
  };
}
