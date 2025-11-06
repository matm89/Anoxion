import { create, type ExtractState } from 'zustand';

interface auth {
  auth: boolean,
}

export const authStore = create<auth> ((set) => ({
  auth:false,
  login: () => set(() => ({ auth: true})),
  logout: () => set(() => ({ auth: false}))
}));
