import { createStore } from 'vuex'
export default createStore({
  state: {
    dark: false,
    store_carts: [],
    store_buy_product: [],
    store_showProduct: true,
    store_showAllProduct: false
  },
  getters: {
    cartItemCount: function () {
      console.log('STORE store_carts.length ==> ', this.state.store_carts.length || '')
      return this.state.store_carts.length || '' // count
    }
  },
  mutations: {
    removeProduct (state) {
      console.log('STORE store_buy_product ==> ', state.store_buy_product)
    },
    showProduct (state) {
      console.log('STORE store_showProduct ==> ', state.store_showProduct)
      console.log('STORE store_showAllProduct ==> ', state.store_showAllProduct)
    },
    carts (state) {
      console.log('STORE store_carts ==> ', state.store_carts)
      console.log('STORE store_buy_product ==> ', state.store_buy_product)
    },
    darks (state, param) {
      console.log('STORE MUTATION dark', param)
      state.dark = true
    },
    greys (state, param) {
      console.log('STORE MUTATION dark', param)
      state.dark = false
    }
  },
  actions: {
    darks ({ commit }, param) {
      console.log('STORE ACTIONS dark', param)
      setTimeout(() => commit('darks'), 1000)
    },
    greys ({ commit }, param) {
      console.log('STORE ACTIONS dark', param)
      setTimeout(() => commit('greys'), 1000)
    }
  },
  modules: {
  }
})
