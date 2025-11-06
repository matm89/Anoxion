import { toast } from "react-toastify";

const apiUrl = 'http://localhost:3000';

export async function getDevices (email:string) {
  try {
    const response = await fetch(`${apiUrl}/devices?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const devices = await response.json();
    return devices;

  } catch (error) {
    console.log(error);
    toast.error('🚨 occurs during on getting devices',{
      icon: () => <img src="/icon.png" width={20}/>
    });

  }
}
