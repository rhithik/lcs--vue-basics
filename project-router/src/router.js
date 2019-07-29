import Vue from 'vue'
import Router from 'vue-router'

// root index cmp
import Home from './views/Home.vue';
import User from './views/User.vue';
import DynamicUser from './views/DynamicUser.vue';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User,
    },
    {
      path: '/dynamic-profile/:name',
      name: 'dynamic',
      component: DynamicUser,
    }
  ]
})
