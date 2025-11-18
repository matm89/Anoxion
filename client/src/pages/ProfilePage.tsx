import { useNavigate } from 'react-router';
import { desauthentificate } from '../services/users';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';

export default function ProfilePage() {
  const navigate = useNavigate();

  function logout() {
    desauthentificate(navigate);
  }

  return (
    <div
      id="dashContainer"
      className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-6 sm:px-6 bg-gradient-to-br from-brand-100 to-brand-300 dark:from-slate-900 dark:to-slate-950 transition-all pb-28">
      <div className="w-full max-w-6xl flex flex-col items-center gap-6">
        <DashboardHeader />
      </div>

      <div className="flex flex-col items-center mt-8 bg-white/60 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-brand-200 dark:border-slate-700 max-w-md w-full transition-colors">
        <h1 className="text-2xl font-bold text-brand-700 dark:text-brand-400 mb-6">
          Profile Options
        </h1>

        <button
          onClick={logout}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl transition shadow-sm hover:shadow-md">
          Log Out
        </button>
      </div>
    </div>
  );
}
