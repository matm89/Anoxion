import { useNavigate } from "react-router";
import { authentificate, type LoginRequestBody } from "../services/users";
import { useState } from "react";
import { toast } from "react-toastify";


export function Login () {

  const navigate = useNavigate();

  const [ form, setForm] = useState({email: '', password:''});

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    console.log(e.target);
    setForm((prev) => ({...prev, [name]: value}));
  }

  async function submitForm (e: React.FormEvent) {
    e.preventDefault();

    try {

      const user: LoginRequestBody = {
        email: form.email,
        password: form.password
      };
      console.log(user);

      const userAuth = await authentificate(user);

      if (!userAuth) throw new Error('Invalid user');

      else navigate("/");
    } catch (error) {
      toast.error((error as Error).message,{
        icon: () => <img src="/icon.png" width={20}/>
      });
    }
  }

  // console.log(auth);
  return (
    <div className="grid place-items-center h-dvh">
      <p>hello from Login</p>
      <form 
        onSubmit={submitForm}
        className="flex flex-col gap-3 bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-xl font-semibold text-center">
           Login 
        </h2>
        <label htmlFor="email">
          E-Mail:
        </label>
        <input 
          type="text" 
          id="email" 
          name="email" 
          value={form.email} 
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button 
          type="submit"
          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        > 
          Login 
        </button>
      </form>
    </div>
  );

}