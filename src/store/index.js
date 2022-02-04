import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

import {server} from './server.js'

export default new Vuex.Store({
  state: {
    isAuthorized: false,
    server: server || 'https://thecntgfy.ru',
    currentDate: (new Date()).toISOString('en-US'),
    accessToken: null,
    tokenHeader: null,
    userRole: null /* String: 'STUDENT', 'ADMIN' */,
    userInfo: {},
    extentionTime: null,
    faqPoints: [
      {
        question: 'Какая максимальная длительность одной брони?',
        answer: 'Длительность одной брони не может превышать двух часов (120 минут).'
      },
      {
        question: 'Сколько одновременно может быть броней у пользователя?',
        answer: 'Пользователь не может иметь более пяти броннней одновременно, включая текущую.'
      },
      // {
      //   question: '',
      //   answer: ''
      // },
    ]
  },
  mutations: {
  },
  getters: {
    logOut: () => {
      localStorage.clear()
      router.push('/unauthorized/login')
    },
    
  },
  actions: {
    fetchAccessToken: (state) => {
      // state.accessToken = true
    }
  },
  modules: {
  }
})
