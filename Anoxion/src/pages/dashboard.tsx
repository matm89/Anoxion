import { useNavigate } from "react-router";
import Dock from "../components/navbar/navbar";
import {VscArchive, VscAccount} from 'react-icons/vsc';
import { useState } from "react";
import { getDevices } from "../services/devices";
import { authStore } from "../context/auth";
import { toast } from "react-toastify";
import { Devices } from "../components/devices/devices";

export function Dashboard () {

  const email = authStore.getState().email;
  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);

  useState(() => {
    if (!email) return;
    try {
      const getData = async () => {
        const data = await getDevices(email);
        setDevices(data);
      };
      getData().catch(error => { throw new Error(error); });
    } catch (error) {
      console.log(error);
      toast.error('🚨 occurs getting data', {
        icon: () => <img src="/icon.png" width={20} />
      });
    }
  });

  const items = [
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => navigate('/processes') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => navigate('/profile') },
  ];

  return (
    <>
        <Dock 
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
      <p>hello from Dashboard</p>
      <Devices devices={devices}/>
    </>
  );
}