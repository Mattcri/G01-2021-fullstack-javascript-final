import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { firebaseApp } from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS (store, products) {
      store.products = products
    }
  },
  actions: {
    async getProducts (actionContext) {
      const { commit } = actionContext
      const productsURL = '/api/products'

      try {
        const token = await firebaseApp.auth().currentUser?.getIdToken(true)
        const response = await axios.get(productsURL, { headers: { Authorization: `Bearer ${token}` } })
        commit('SET_PRODUCTS', response.data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
