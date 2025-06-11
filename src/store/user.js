import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: null,
    isAdmin: false
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
    getUserInfo: (state) => state.userInfo
  },
  
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    
    setToken(token) {
      this.token = token
    },
    
    setAdminStatus(isAdmin) {
      this.isAdmin = isAdmin
    },
    
    logout() {
      this.userInfo = null
      this.token = null
      this.isAdmin = false
    }
  },
  
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage,
        paths: ['token', 'userInfo', 'isAdmin']
      }
    ]
  }
}) 