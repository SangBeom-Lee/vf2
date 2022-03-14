import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    edittable: true,
    fireUser: null
  },
  getters: {
  },
  mutations: {
    setEdit (state, edit) {
      state.edittable = edit
    },
    setFireUser (state, fu) {
      state.fireUser = fu
    }
  },
  actions: {
  },
  modules: {
  }
})
