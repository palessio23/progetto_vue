import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /*username: '',*/
    detailsRes: '',
    infoResource: '',
    registryRes: {},
    jsonProductUser: '',


    // new var
    serverUrl: "http://localhost:3000"
  }
})
