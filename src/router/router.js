import Vue from 'vue'
import VueRouter from 'vue-router'
import PageLayout from '../components/Page/PageLayout'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login',
      component: () => import('@/components/Login')
    },
    { path: '/register',
      component: () => import('@/components/Register')
    },
    {
      name: 'Home',
      path: '/home',
      component: PageLayout,
      children: [
        {
          path: '/home',
          component: () => import('@/components/Content'),
        },
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
