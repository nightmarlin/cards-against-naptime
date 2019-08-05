import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/testing',
      name: 'testing',
      component: () => import(/* webpackChunkName: "testing" */ './views/Testing.vue')
    },
    {
      path: '/legal',
      name: 'legal',
      component: () => import(/* webpackChunkName: "legal" */ './views/Legal.vue')
    },
    {
      path: '/serverlist',
      name: 'serverlist',
      component: () => import(/* webpackChunkName: "serverlist" */ './views/Serverlist.vue')
    }
  ]
})
