import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserRole } from '../types/admin'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  city?: string
  district?: string
  ward?: string
  role: UserRole
  active: boolean
}

interface AuthState {
  token: string | null
  refreshToken: string | null
  user: User | null
  isAuthenticated: boolean
  login: (token: string, refreshToken: string, user: User) => void
  logout: () => void
  updateUser: (user: User) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      login: (token, refreshToken, user) => 
        set({ token, refreshToken, user, isAuthenticated: true }),
      logout: () => 
        set({ token: null, refreshToken: null, user: null, isAuthenticated: false }),
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore