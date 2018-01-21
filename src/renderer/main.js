import Vue from 'vue'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import deepmerge from 'deepmerge'

import app from './app'
import router from './router'
import store from './store'

// Load shared Electron / Vue i18n languages
import arLocale from '../translations/ar'
import deLocale from '../translations/de'
import enLocale from '../translations/en'
import esLocale from '../translations/es'
import frLocale from '../translations/fr'
import jaLocale from '../translations/ja'
import msLocale from '../translations/ms'
import ptLocale from '../translations/pt'
import ruLocale from '../translations/ru'
import zhLocale from '../translations/zh'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

// Setup HTTP
Vue.http = Vue.prototype.$http = axios
Vue.http.defaults.baseURL = process.env.WEATHERBAR_API_DOMAIN
Vue.http.defaults.headers.common['API-Key'] = process.env.WEATHERBAR_API_KEY

Vue.config.productionTip = false

// Setup International Support for Vue
Vue.use(VueI18n)

// Merge all the language files
const messages = deepmerge.all([
  arLocale,
  deLocale,
  enLocale,
  esLocale,
  frLocale,
  jaLocale,
  msLocale,
  ptLocale,
  ruLocale,
  zhLocale
])

const i18n = new VueI18n({
  locale: 'en',
  messages
})

new Vue({
  components: { app },
  i18n,
  router,
  store,
  template: '<app/>'
}).$mount('#app')
