import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface auth {
  auth: boolean,
  login: () => void,
  logout: () => void
}

export const authStore = create<auth>() (
  persist (
    (set) => ({
      auth:false,
      login: () => set(() => ({ auth: true})),
      logout: () => set(() => ({ auth: false}))
    }),
    {
      name: 'auth-store'
    }
  )
);
