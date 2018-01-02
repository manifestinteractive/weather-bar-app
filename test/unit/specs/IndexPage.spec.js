import Vue from 'vue'
import IndexPage from '@/components/IndexPage'

describe('IndexPage.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(IndexPage)
    }).$mount()

    expect(vm.$el.querySelector('.title').textContent).to.contain('WEATHER BAR')
  })
})
