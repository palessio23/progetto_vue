import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies);

/*router.beforeEach((to, from, next) => {
  window.console.log("d");
  next();
});*/

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')