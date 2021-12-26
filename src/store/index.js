import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthorized: false,
    server: 'https://thecntgfy.ru',
    currentDate: (new Date()).toISOString('en-US'),
    accessToken: null,
    tokenHeader: null,
    userInfo: {}
  },
  mutations: {
  },
  getters: {
    logOut: () => {
      console.log('logOuting from store')
      localStorage.removeItem('accessToken')
      router.push('/unauthorized/login')
    },
    
  },
  actions: {
    fetchAccessToken: (state) => {
      console.log('heh')
      // state.accessToken = true
    }
  },
  modules: {
  }
})
