import { createStore } from 'vuex';


const store = createStore({
  state: {
    crumbList:[],
    location:{}
  },
  getters: {
  },
  mutations: {
    setBreadList (state, data) {
      state.crumbList = data
    },
    updateLocation (state, data) {
      state.location = data
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store
