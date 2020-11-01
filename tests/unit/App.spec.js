import { shallowMount } from '@vue/test-utils'
import Header from '../../src/App.vue'


describe('App.vue Test', () => {
  it('renders message when component is created', () => {
   
    const wrapper = shallowMount(Header, {
      propsData: {
        title: 'Vue Project'
      }
    })

   
    expect(wrapper.name()).toMatch('App')

    
  })
})