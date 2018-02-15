import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/page/index').default
    },
    {
      path: '/saved-location/:key?',
      name: 'saved-location',
      component: require('@/components/page/saved-location').default
    },
    {
      path: '/saved-locations',
      name: 'saved-locations',
      component: require('@/components/page/saved-locations').default
    },
    {
      path: '/preferences',
      name: 'preferences',
      component: require('@/components/page/preferences').default
    },
    {
      path: '/new-location',
      name: 'new-location',
      component: require('@/components/page/new-location').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
