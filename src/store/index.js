import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    noUmum: null,
    noGigi: null,
    noKulit: null,
    noTht: null,
  },
  getters: {
  },
  mutations: {
    setNoUmum(state, payload){
      state.noUmum = payload
    },
    setNoGigi(state, payload){
      state.noGigi = payload
    },
    setNoKulit(state, payload){
      state.noKulit = payload
    },
    setNoTht(state, payload){
      state.noTht = payload
    },
  },
  actions: {
    changeNoUmum(store, payload){
      store.commit("setNoUmum", payload)
    },
    changeNoGigi(store, payload){
      store.commit("setNoGigi", payload)
    },
    changeNoKulit(store, payload){
      store.commit("setNoKulit", payload)
    },
    changeNoTht(store, payload){
      store.commit("setNoTht", payload)
    }
  },
  modules: {
  }
})
