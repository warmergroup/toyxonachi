import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  phone: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  actions: {
    async register(userData: {
      name: string
      email: string
      phone: string
      password: string
    }) {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })

        if (!response.ok) {
          throw new Error('Registratsiya xatosi')
        }

        const data = await response.json()
        this.setAuth(data)
        return data
      } catch (error) {
        console.error('Registratsiya xatosi:', error)
        throw error
      }
    },

    async login(credentials: {
      email: string
      password: string
    }) {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })

        if (!response.ok) {
          throw new Error('Login xatosi')
        }

        const data = await response.json()
        this.setAuth(data)
        return data
      } catch (error) {
        console.error('Login xatosi:', error)
        throw error
      }
    },

    async logout() {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        this.clearAuth()
      } catch (error) {
        console.error('Logout xatosi:', error)
        throw error
      }
    },

    async fetchUser() {
      try {
        const response = await fetch('/api/auth/user', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })

        if (!response.ok) {
          throw new Error('Foydalanuvchi ma\'lumotlarini olish xatosi')
        }

        const data = await response.json()
        this.user = data
        return data
      } catch (error) {
        console.error('Foydalanuvchi ma\'lumotlarini olish xatosi:', error)
        throw error
      }
    },

    setAuth(data: { user: User; token: string }) {
      this.user = data.user
      this.token = data.token
      this.isAuthenticated = true
      // Token ni localStorage ga saqlash
      localStorage.setItem('auth_token', data.token)
    },

    clearAuth() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      // Token ni localStorage dan o'chirish
      localStorage.removeItem('auth_token')
    },

    // Dastur ishga tushganda token ni tekshirish
    initAuth() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        this.token = token
        this.isAuthenticated = true
        this.fetchUser()
      }
    }
  }
}) 