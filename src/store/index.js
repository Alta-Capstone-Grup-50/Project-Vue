import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const persistedDataState = createPersistedState({
  paths: ["noUmum", "noGigi", "noKulit", "noTht"],
})

export default new Vuex.Store({
  plugins: [persistedDataState],
  state: {
    noUmum: '',
    noGigi: '',
    noKulit: '',
    noTht: '',
    userID: 0,
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
    setUserID(state, payload){
      state.userID = payload
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
    },
    changeUserID(store, payload){
      store.commit("setUserID", payload)
    }
  },
  modules: {
  }
})
