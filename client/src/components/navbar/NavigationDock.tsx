import { useNavigate, useLocation } from 'react-router';
import Dock from './navbar';
import { VscArchive, VscAccount, VscHome } from 'react-icons/vsc';

export function NavigationDock() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const items = [
    {
      icon: <VscHome size={20} className={isActive('/') ? 'text-brand-600' : 'text-gray-600'} />,
      label: 'Home',
      onClick: () => navigate('/'),
      className: isActive('/') ? 'border-2 border-brand-500 bg-brand-50 shadow-inner' : '',
    },
    {
      icon: (
        <VscArchive
          size={20}
          className={isActive('/processes') ? 'text-brand-600' : 'text-gray-600'}
        />
      ),
      label: 'Archive',
      onClick: () => navigate('/processes'),
      className: isActive('/processes') ? 'border-2 border-brand-500 bg-brand-50 shadow-inner' : '',
    },
    {
      icon: (
        <VscAccount
          size={20}
          className={isActive('/profile') ? 'text-brand-600' : 'text-gray-600'}
        />
      ),
      label: 'Profile',
      onClick: () => navigate('/profile'),
      className: isActive('/profile') ? 'border-2 border-brand-500 bg-brand-50 shadow-inner' : '',
    },
  ];

  return (
    <div className="fixed bottom-4 left-32 -translate-x-1/2 z-50 mb-2">
      <Dock items={items} panelHeight={60} baseItemSize={45} magnification={60} />
    </div>
  );
}
