/*
 * @Author: beyondouyuan
 * @Date:   2018-03-18 01:48:24
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2018-10-03 20:13:50
 */

import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)



const store = () => new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})


export default store
