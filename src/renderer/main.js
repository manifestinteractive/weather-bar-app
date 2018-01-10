import Vue from 'vue'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import deepmerge from 'deepmerge'

import App from './App'
import router from './router'
import db from './datastore'

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
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db

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

const getLocale = new Promise((resolve) => {
  db.settings.findOne({ setting: 'locale' }, (err, results) => {
    if (!err && typeof results !== 'undefined') {
      resolve(results.value)
    } else {
      resolve('en')
    }
  })
})

// Get Users Language Before Loading App
getLocale.then(locale => {
  const i18n = new VueI18n({
    locale: locale,
    messages
  })

  new Vue({
    components: { App },
    i18n,
    router,
    template: '<App/>'
  }).$mount('#app')
})
