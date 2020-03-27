import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import loading from '@/store/modules/loading'
import register from '@/store/modules/register'
import service from '@/store/modules/service'
import token from '@/store/modules/token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    loading,
    register,
    service,
    token
  }
})