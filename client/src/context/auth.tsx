import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface auth {
  auth: boolean,
  email: string,
  login: () => void,
  logout: () => void,
  setEmail: (arg0: string) => void
}

export const authStore = create<auth>() (
  persist (
    (set) => ({
      auth:false,
      email:'',
      login: () => set(() => ({ auth: true})),
      logout: () => set(() => ({ auth: false})),
      setEmail: (newEmail:string) => set(() => ({email: newEmail})),
    }),
    {
      name: 'auth-store'
    }
  )
);
