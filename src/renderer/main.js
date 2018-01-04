import Vue from 'vue'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import deepmerge from 'deepmerge'

import App from './App'
import router from './router'
import store from './store'
import db from './datastore'

// Load shared Electron / Vue i18n languages
import enLocale from '../translations/en.js'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db

// Setup International Support for Vue
Vue.use(VueI18n)

// Merge all the language files
const messages = deepmerge.all([enLocale])

/* eslint-disable no-new */
const i18n = new VueI18n({
  locale: 'en',
  messages
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  i18n,
  router,
  store,
  template: '<App/>'
}).$mount('#app')
