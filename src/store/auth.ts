import { defineStore } from 'pinia'
import type { User, UserRecord } from '../types/user'

const USERS_STORAGE_KEY = 'shophub-users'
const CURRENT_USER_STORAGE_KEY = 'shophub-current-user'

function loadUsers(): UserRecord[] {
  if (typeof window === 'undefined') return []

  const stored = window.localStorage.getItem(USERS_STORAGE_KEY)
  if (!stored) return []

  try {
    return JSON.parse(stored) as UserRecord[]
  } catch {
    window.localStorage.removeItem(USERS_STORAGE_KEY)
    return []
  }
}

function saveUsers(users: UserRecord[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

function loadCurrentUser(): User | null {
  if (typeof window === 'undefined') return null

  const stored = window.localStorage.getItem(CURRENT_USER_STORAGE_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored) as User
  } catch {
    window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY)
    return null
  }
}

function saveCurrentUser(user: User | null) {
  if (typeof window === 'undefined') return

  if (user) {
    window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user))
  } else {
    window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY)
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: loadCurrentUser() as User | null,
    users: loadUsers() as UserRecord[]
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.currentUser),
    displayName: (state) => state.currentUser?.fullName ?? 'Guest User'
  },
  actions: {
    register(user: UserRecord) {
      const existingUser = this.users.find((item) => item.email.toLowerCase() === user.email.toLowerCase())
      if (existingUser) {
        throw new Error('A user with this email already exists.')
      }

      this.users.push(user)
      saveUsers(this.users)
    },
    login(email: string, password: string) {
      const user = this.users.find(
        (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password
      )
      if (!user) {
        throw new Error('Invalid email or password.')
      }

      this.currentUser = { fullName: user.fullName, email: user.email }
      saveCurrentUser(this.currentUser)
    },
    logout() {
      this.currentUser = null
      saveCurrentUser(null)
    }
  }
})
