import { Outlet } from 'react-router';
import { NavigationDock } from '../components/navbar/NavigationDock';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Outlet />

      <NavigationDock />
    </div>
  );
}
