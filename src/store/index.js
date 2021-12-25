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
  },
  mutations: {
  },
  getters: {
    // getAvailableTimeForBooking: (state) => (date) => {
    //   console.log('heh')
    //   fetch(`${state.server}/bookings/available?date=${date}`)
    //   .then( res => {
    //     console.log(res.json())
    //     return res.json()
    //   })
    // }
    logOut: () => {
      localStorage.removeItem('accessToken')
      router.push('/unauthorized/login')
    }
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
