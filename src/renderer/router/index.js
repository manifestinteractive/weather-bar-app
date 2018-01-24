import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index-page',
      component: require('@/components/page/index').default
    },
    {
      path: '/splash',
      name: 'splash-page',
      component: require('@/components/page/splash').default
    },
    {
      path: '/preferences',
      name: 'preferences-page',
      component: require('@/components/page/preferences').default
    },
    {
      path: '/select',
      name: 'select-page',
      component: require('@/components/page/select').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
