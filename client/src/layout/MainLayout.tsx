import { Outlet } from 'react-router';
import { NavigationDock } from '../components/navbar/NavigationDock';
import { ToastContainer, Bounce } from 'react-toastify';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Outlet />

      <NavigationDock />

      <ToastContainer position="top-right" autoClose={5000} transition={Bounce} />
    </div>
  );
}
