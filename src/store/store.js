import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// le variabili in questa pagina sono globali, accessibili in qualsiasi file del progetto
// grazie all'inserimento dello store nel file main.js che rende di fatto globale l'accesso a store.js

export default new Vuex.Store({
  state: {
    /*username: '',*/
    detailsRes: '',
    infoResource: '',
    registryRes: {},
    jsonProductUser: '',


    // new var
    serverUrl: "http://localhost:3000",
    user: {
      name: "Sam",
      imgProfile: "https://life.ns12.it/wp-content/uploads/avatars/1/5da585a5729ed-bpfull.jpg"
    }
  }
})
