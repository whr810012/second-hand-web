import { createStore } from 'vuex';


const store = createStore({
  state: {
    crumbList:[],
    location:{},
    MyInfo:{}
  },
  getters: {
  },
  mutations: {
    setBreadList (state, data) {
      state.crumbList = data
    },
    updateLocation (state, data) {
      state.location = data
    },
    setUserInfo (state, data) {
      state.MyInfo = data
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store
