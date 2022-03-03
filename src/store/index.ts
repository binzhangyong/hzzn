import { createStore } from 'vuex'
import getters from '@/store/getters'
import user from '@/store/modules/user'
import menu from '@/store/modules/menu'

export default createStore<{ [key: string]: any }>({
  state: {},
  mutations: {},
  actions: {},
  getters,
  modules: {
    user,
    menu
  }
})
