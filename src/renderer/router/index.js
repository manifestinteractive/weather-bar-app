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
      path: '/saved-locations',
      name: 'saved-locations',
      component: require('@/components/page/saved-locations').default
    },
    {
      path: '/preferences',
      name: 'preferences-page',
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
