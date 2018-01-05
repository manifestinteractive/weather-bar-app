import Vue from 'vue'
import VueI18n from 'vue-i18n'
import deepmerge from 'deepmerge'

import IndexPage from '@/components/IndexPage'

// Load shared Electron / Vue i18n languages
import enLocale from '../../../src/translations/en'

// Setup International Support for Vue
Vue.use(VueI18n)

// Merge all the language files
const messages = deepmerge.all([enLocale])

/* eslint-disable no-new */
const i18n = new VueI18n({
  locale: 'en',
  messages
})

describe('IndexPage.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      i18n,
      el: document.createElement('div'),
      render: h => h(IndexPage)
    }).$mount()

    expect(vm.$el.querySelector('.title').textContent).to.contain('Weather Bar')
  })
})
