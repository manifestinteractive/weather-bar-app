import Vue from 'vue'
import VueI18n from 'vue-i18n'
import deepmerge from 'deepmerge'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

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
import plLocale from '../translations/pl'
import ptLocale from '../translations/pt'
import ruLocale from '../translations/ru'
import zhLocale from '../translations/zh'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.config.productionTip = false

// Setup International Support for Vue
Vue.use(VueI18n)

// Use Moment with Timezone Support
Vue.use(VueMoment, {
  moment
})

// Merge all the language files
const messages = deepmerge.all([
  arLocale,
  deLocale,
  enLocale,
  esLocale,
  frLocale,
  jaLocale,
  msLocale,
  plLocale,
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
