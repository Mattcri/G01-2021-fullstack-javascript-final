import { mount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'
import flushPromises from 'flush-promises'
import Vuetify from 'vuetify'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import products from '../../../fixtures/products.json'

jest.mock('axios', () => ({
  get: jest.fn()
}))

jest.mock('@/firebase', () => ({
  firebaseApp: {
    auth: jest.fn().mockReturnValue({
      currentUser: {
        name: 'dummyUser',
        getIdToken: () => 'fakeToken'
      },
      onAuthStateChanged: jest.fn().mockImplementation((callback) => {
        const user = { name: 'Matias' }
        callback(user)
      })
    })
  }
}))

describe('Product.vue', () => {
  let localVue
  let vuetify

  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()

    store.replaceState({
      products: []
    })
    axios.get.mockReset()
    router.push('/')
  })

  it('Shows a list of products when the server response successfully', async () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
      store,
      router
    })
    axios.get.mockResolvedValue({ data: products })

    router.push({ name: 'Products' })
    await flushPromises()

    expect(wrapper.findAll('[data-cy=product-item]')).toHaveLength(products.length)
    expect(store.state.products).toEqual(products)
  })

  it('Shows an empty list of products when the server response failed', async () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
      store,
      router
    })
    const errorMessage = 'Database Error in Server'
    axios.get.mockRejectedValue(new Error(errorMessage))

    router.push({ name: 'Products' })
    await flushPromises()

    expect(wrapper.findAll('[data-cy=product-item]')).toHaveLength(0)
    expect(store.state.products).toEqual([])
  })
})
