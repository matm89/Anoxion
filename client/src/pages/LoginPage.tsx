import { authentificate, type LoginRequestBody } from '../services/users';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import ThemeToggle from '../components/themetoggle/ThemeToggle';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();

    try {
      const user: LoginRequestBody = {
        email: form.email,

        password: form.password,
      };

      if (!user.email || !user.password) throw new Error('Please enter email and password');

      const userAuth = await authentificate(user);

      if (!userAuth) throw new Error('Invalid user');
      else navigate('/');
    } catch (error) {
      toast.error((error as Error).message, {
        icon: () => <img src="/icon.png" width={20} />,
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-brand-100 to-brand-300 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300 relative">
      <div className="absolute top-0 w-full max-w-6xl flex justify-end p-6 z-50">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center p-4">
        <img src="/logo.png" alt="Anoxion Logo" className="w-64 h-auto mb-4 drop-shadow-lg" />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-brand-200 dark:border-slate-700 transition-colors">
        <h2 className="text-2xl font-bold text-center text-brand-700 dark:text-brand-400 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={submitForm} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-1">
              E-Mail
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-brand-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-md p-3 outline-none focus:border-brand-500 focus:ring focus:ring-brand-200 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-1">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-brand-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-md p-3 outline-none focus:border-brand-500 focus:ring focus:ring-brand-200 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-brand-600 hover:bg-brand-700 dark:bg-brand-600 dark:hover:bg-brand-500 text-white font-semibold py-3 rounded-md transition shadow-sm hover:shadow-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
