import Vue from 'vue'
import Router from 'vue-router'
import SMO from '@/components/SMO'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SMO',
      component: SMO
    }
  ]
})
