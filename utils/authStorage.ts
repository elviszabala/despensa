//authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  user: string | null;
  login: (token: string, user: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      token: null,
      user: null,

      login: (token, user) =>
        set({
          isLoggedIn: true,
          token,
          user,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
          token: null,
          user: null,
        }),
    }),
    {
      name: 'auth-storage', // Clave para AsyncStorage
    }
  )
);