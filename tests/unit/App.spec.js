import { shallowMount } from '@vue/test-utils'
import Header from '../../src/App.vue'


describe('App.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(Header, {
      propsData: {
        title: 'Vue Project'
      }
    })

    // check the name of the component
    expect(wrapper.name()).toMatch('App')

    // check that the title is rendered
    //expect(wrapper.text()).toMatch('Vue Project')
  })
})