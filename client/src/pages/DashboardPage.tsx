import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getDevices } from '../services/devices';
import { authStore } from '../context/auth';
import { toast } from 'react-toastify';
import type { Device } from '../types/device';
import gsap from 'gsap';
import { getProcesses } from '../services/processes';
import type { Process } from '../types/process';
import { ProcessList } from '../components/processlist/ProcessList';

// new components
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { DeviceList } from '../components/dashboard/DeviceList';
import { RunningDevicesPanel } from '../components/dashboard/RunningDevicesPanel';

export default function DashboardPage() {
  const email = authStore.getState().email;

  const [devices, setDevices] = useState<Device[]>([
    {
      device: 'Loadings Devices',
      state: {
        'e-stop': false,
        status: 'stopped',
        last_check: new Date(),
      },
    },
  ]);

  const processes = useRef<Process[]>([]);
  const processesList = useRef([]);

  const containerRef = useRef<HTMLDivElement>(null);

  //get devices with email
  useEffect(() => {
    if (!email || typeof email !== 'string') return;

    async function loadDevices() {
      try {
        const data = await getDevices(email);
        if (!Array.isArray(data)) return;
        setDevices(data);
      } catch (error) {
        console.log(error);
        toast.error('🚨 occurs getting data', {
          icon: () => <img src="/icon.png" width={20} />,
        });
      }
    }

    loadDevices();
    const interval = setInterval(loadDevices, 1000);
    return () => clearInterval(interval);
  }, [email]);

  //get process from service
  useEffect(() => {
    if (!email || typeof email !== 'string') return;

    async function loadProcesses() {
      try {
        const data = await getProcesses();
        processesList.current = data[0];
        processes.current = data[1];
      } catch (error) {
        console.log(error);
        toast.error('🚨 occurs getting process', {
          icon: () => <img src="/icon.png" width={20} />,
        });
      }
    }

    loadProcesses();
  }, [email]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('#dashContainer', {
        background: 'linear-gradient(135deg, #e0f2ff, #d0e3ff, #e0f2ff)',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      gsap.utils.toArray<HTMLElement>('.device-card').forEach((el) => {
        const hover = gsap.to(el, {
          scale: 1.05,
          duration: 0.3,
          paused: true,
          ease: 'power1.out',
        });

        el.addEventListener('mouseenter', () => hover.play());
        el.addEventListener('mouseleave', () => hover.reverse());
      });
    }, containerRef);

    return () => ctx.revert();
  }, [devices]);

  return (
    <div
      id="dashContainer"
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-6 sm:px-6 bg-gradient-to-br from-brand-100 to-brand-300 dark:from-slate-900 dark:to-slate-950 transition-all overflow-x-hidden pb-28">
      <div className="w-full max-w-6xl flex flex-col items-center gap-6">
        <DashboardHeader />

        <DeviceList devices={devices} />

        <RunningDevicesPanel devices={devices} />

        <div className="w-full flex flex-col items-center mt-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-700 dark:text-brand-400  mb-6">
            Process List
          </h1>
          <div id="process-container" className="w-full">
            <ProcessList processList={processesList.current} processes={processes.current} />
          </div>
        </div>
      </div>
    </div>
  );
}
