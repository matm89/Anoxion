import { useNavigate } from "react-router";
import Dock from "../components/navbar/navbar";
import { VscArchive, VscAccount } from "react-icons/vsc";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getDevices } from "../services/devices";
import { authStore } from "../context/auth";
import { toast } from "react-toastify";
import { Devices } from "../components/devices/devices";
import type { Device } from "../types/device";
import gsap from "gsap";
import { getProcesses } from "../services/processes";
import { ProcessList } from "../components/processlist/processlist";
import type { Process } from "../types/process";

export function Dashboard() {
  const email = authStore.getState().email;
  const navigate = useNavigate();

  const [devices, setDevices] = useState<Device[]>([
    { device: "example", state: { "e-stop": false, state: "running", last_check: "" } },
  ]);

  const [processes , setProcesses] = useState<Process[]>();
  const [processesList , setProcressList] = useState([]);

  const containerRef = useRef<HTMLDivElement>(null);

  //get data with email
  useEffect(() => {
    if (!email) return; 
    try {
      const getData = async () => {
        const data = await getDevices(email);
        setDevices(data);
        // console.log(data);
      };
      getData().catch((error) => {
        throw new Error(error);
      });
    } catch (error) {
      console.log(error);
      toast.error("🚨 occurs getting data", {
        icon: () => <img src="/icon.png" width={20} />,
      });
    }
  }, [email]);

  //get process from service
  useEffect(() => {
    if(!email) return;
    try {
      const getData = async () => {
        const data = await getProcesses();
        // console.log(data);
        setProcressList(data[0]);
        setProcesses(data[1]);
      };
      getData().catch((error) => {
        throw new Error(error);
      });
    } catch (error) {
      console.log(error);
      toast.error("🚨 occurs getting process", {
        icon: () => <img src="/icon.png" width={20} />,
      });
    }
  },[email])

  // Start mock updater
  useEffect(() => {
    const stopMock = mockDeviceConnections(devices, setDevices, 30_000); // 30s for testing
    return stopMock;
  }, []);

  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background gradient animation
      gsap.to("#dashContainer", {
        background: "linear-gradient(135deg, #e0f2ff, #d0e3ff, #e0f2ff)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Device card entrance animation
      gsap.from(".device-card", {
        opacity: 0,
        scale: 0.8,
        y: 30,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
        delay: 0.3,
      });

      // Hover effect for device cards
      gsap.utils.toArray(".device-card").forEach((el: any) => {
        const hover = gsap.to(el, {
          scale: 1.05,
          duration: 0.3,
          paused: true,
          ease: "power1.out",
        });
        el.addEventListener("mouseenter", () => hover.play());
        el.addEventListener("mouseleave", () => hover.reverse());
      });
    }, containerRef);

    return () => ctx.revert();
  }, [devices]);

  const items = [
    { icon: <VscArchive size={18} />, label: "Archive", onClick: () => navigate("/processes") },
    { icon: <VscAccount size={18} />, label: "Profile", onClick: () => navigate("/profile") },
  ];

  return (
    <div
      id="dashContainer"
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-start p-6 bg-gradient-to-br from-brand-100 to-brand-300 transition-all"
    >
      <div id="header container" className="flex flex-col items-center mb-6">
        <img src="/logo.png" alt="logo" className="w-[30vw] h-[30vh] mb-1 drop-shadow-lg" />
        <h1 className="text-3xl font-bold text-brand-700">Dashboard</h1>
      </div>

      <div id="DeviceContainer" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {devices.map((d, i) => (
          <div
            key={i}
            className="device-card bg-white/80 backdrop-blur-sm border border-brand-200 shadow-lg rounded-xl p-4"
          >
            <Devices devices={[d]} />
          </div>
        ))}
      </div>
      {/* process grid*/}
      <h1 className="text-3xl font-bold text-brand-700 m-4">Process List</h1>
      <div id="process Container" className="grid grid-cols-1 gap-6 w-full max-w-5xl m-2">

        {processes && <ProcessList processList={processesList} processes={processes}/>} 
      </div>
      {/* status grid in case that we have a running process*/}
        {
          // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          //   {devices.map((device, i) => (
          //     <div
          //       key={i}
          //       className="device-card bg-white/80 backdrop-blur-sm border border-brand-200 shadow-lg rounded-xl p-4"
          //     >
          //       <Devices devices={[d]} />
          //     </div>
          //   ))}
          // </div>
        }
      
      <div id="DockContainer" className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-8 mb-4 p-2">
        <Dock items={items} panelHeight={68} baseItemSize={50} magnification={50} />
      </div>
    </div>
  );
}

/**
 * Mock device updater
 */
function mockDeviceConnections(
  devices: Device[],
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>,
  interval: number = 5 * 60 * 1000
) {
  const updateDevices = () => {
    const now = new Date().toISOString();
    setDevices((prev) =>
      prev.map((dev) => ({
        ...dev,
        last_check: now,
      }))
    );
  };
  updateDevices();
  const timer = setInterval(updateDevices, interval);
  return () => clearInterval(timer);
}
