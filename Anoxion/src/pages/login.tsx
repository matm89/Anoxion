import { authentificate, type LoginRequestBody } from "../services/users";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

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

      if (!user.email || !user.password)
        throw new Error("Please enter email and password");

      const userAuth = await authentificate(user);

      if (!userAuth) throw new Error("Invalid user");
      else navigate("/");
    } catch (error) {
      toast.error((error as Error).message, {
        icon: () => <img src="/icon.png" width={20} />,
      });
    }
  }

  return (
    <>
    <img src="/logo.png"/>
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-100 to-brand-300">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-brand-200">
      <h2 className="text-2xl font-bold text-center text-brand-700 mb-6">
        Welcome to Anoxion!
      </h2>

      <form onSubmit={submitForm} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-brand-700 mb-1"
          >
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-brand-300 focus:border-brand-500 focus:ring focus:ring-brand-200 focus:ring-opacity-50 rounded-md p-2 outline-none transition"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-brand-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-brand-300 focus:border-brand-500 focus:ring focus:ring-brand-200 focus:ring-opacity-50 rounded-md p-2 outline-none transition"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 rounded-md transition shadow-sm hover:shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  </div>
    </>
);
}
