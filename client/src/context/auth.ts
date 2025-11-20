import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface auth {
  auth: boolean;
  user: string;
  email: string;
  login: (user: string, email: string) => void;
  logout: () => void;
  updateUser: (user: string, email: string) => void;
  setEmail: (arg0: string) => void;
}

export const authStore = create<auth>()(
  persist(
    (set) => ({
      auth: false,
      user: '',
      email: '',
      login: (user, email) =>
        set(() => ({
          auth: true,
          user: user,
          email: email,
        })),
      logout: () =>
        set(() => ({
          auth: false,
          user: '',
          email: '',
        })),
      updateUser: (newUser, newEmail) =>
        set(() => ({
          user: newUser,
          email: newEmail,
        })),
      setEmail: (newEmail: string) => set(() => ({ email: newEmail })),
    }),
    {
      name: 'auth-store',
    },
  ),
);
