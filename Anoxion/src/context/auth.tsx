import { create } from 'zustand';

interface auth {
  auth: boolean,
  login: () => void,
  logout: () => void
}

export const authStore = create<auth> ((set) => ({
  auth:false,
  login: () => set(() => ({ auth: true})),
  logout: () => set(() => ({ auth: false}))
}));
