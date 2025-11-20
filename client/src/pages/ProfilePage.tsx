import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { desauthentificate } from '../services/users';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { authStore } from '../context/auth';
import { toast } from 'react-toastify';
import { VscSave, VscSignOut, VscKey } from 'react-icons/vsc';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, email, updateUser } = authStore();

  const [initialData, setInitialData] = useState({
    username: '',
    email: '',
  });

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user || email) {
      const data = { username: user || 'Miguel', email: email || 'test@email.com' };
      setInitialData(data);
      setForm({ ...data, password: '' });
    }
  }, [user, email]);

  const isChanged =
    form.username !== initialData.username ||
    form.email !== initialData.email ||
    form.password.length > 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!isChanged) return;

    updateUser(form.username, form.email);

    setInitialData({ username: form.username, email: form.email });

    if (form.password.length > 0) {
      console.log('🔐 Password simulating update to:', form.password);
      toast.success('Password updated successfully!', {
        icon: () => <VscKey size={20} className="text-green-500" />,
      });
      setForm((prev) => ({ ...prev, password: '' }));
    }

    toast.success('Profile saved!', {
      icon: () => <img src="/icon.png" width={20} />,
    });
  }

  function logout() {
    desauthentificate(navigate);
  }

  return (
    <div
      id="dashContainer"
      className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-6 sm:px-6 bg-gradient-to-br from-brand-100 to-brand-300 dark:from-slate-900 dark:to-slate-950 transition-all pb-28">
      <div className="w-full max-w-6xl flex flex-col items-center gap-6">
        <DashboardHeader />

        <div className="w-full max-w-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-brand-200 dark:border-slate-700 transition-colors mt-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-brand-800 dark:text-brand-400">User Settings</h1>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Display Name
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Change Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                placeholder="Type new password to change..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
              <button
                type="submit"
                disabled={!isChanged}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl shadow-sm transition-all font-semibold
                  ${
                    isChanged
                      ? 'bg-brand-600 hover:bg-brand-700 text-white hover:shadow-md cursor-pointer'
                      : 'bg-brand-600/80 dark:bg-brand-600/80 text-white  dark:text-brand-200 cursor-not-allowed'
                  }`}>
                <VscSave size={20} />
                Save Changes
              </button>

              <button
                type="button"
                onClick={logout}
                className="flex-1 flex items-center justify-center gap-2 bg-red-700/80 hover:bg-red-700 text-white dark:bg-red-900/70 dark:hover:bg-red-900 dark:text-red-200 font-semibold py-3 rounded-xl transition-all">
                <VscSignOut size={20} />
                Log Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
