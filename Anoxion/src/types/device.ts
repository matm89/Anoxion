export interface Device {
  device: string,
  state: {
    "e-stop": boolean,
    state: "running" | "stopped" | string,
    last_check: Date
  };
}

export interface DevicesProps {
  devices: Device[],
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>

}

export type DeviceMock = {
  device:string,
  state:boolean
}