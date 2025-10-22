import { create } from 'zustand'
import type { IUser } from '../constants/interfaces'
import type { TAuthContextType } from '../constants/types'
import { authService } from '../services/authService';
import { persist } from 'zustand/middleware';
import { storageService } from '../services/storage';

const initialUser: IUser = {
  id: "",
  name: "",
  username: "",
  role: {
    id: "",
    name: ""
  },
};

export const KEY_AUTH_STORE = 'gaianix-user-storage'

export const useAuthStore = create<TAuthContextType>()(
  persist(
    (
      (set) => ({
        user: initialUser,
        isAuthenticated: false,
        handleLogin: async (username: string, password: string) => {
          try {
            const userData = await authService.login(username, password)
            set({ isAuthenticated: true, user: userData.data.user })
            
            return true
          } catch {
            return false
          }
        },
        handleLogout: async () => {
          await authService.logout()
          set({ isAuthenticated: false, user: initialUser })

          storageService.removeItem(KEY_AUTH_STORE)
        }
      })
    ),
    {
      name: KEY_AUTH_STORE,
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
)