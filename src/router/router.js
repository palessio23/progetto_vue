import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/home', redirect: '/home/menu' },
    { path: '/login',
      component: () => import('@/components/Login')
    },
    { path: '/register',
      component: () => import('@/components/Register')
    },
    { path: '/home',
      component: () => import('@/components/Home'),
      children: [
        {
          path: '/home/search',
          component: () => import('@/components/Search'),
        },
        {
          path: '/home/resource',
          component: () => import('@/components/Resource'),
        },
        {
          path: '/home/menu',
          component: () => import('@/components/Menu'),
        },
        {
          path: '/home/yuvalue',
          component: () => import('@/components/yuValue'),
        }
      ]
    },
    { path: '*', redirect: '/home/menu' },
  ]
});


