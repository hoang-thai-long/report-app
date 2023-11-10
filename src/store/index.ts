import Vue from 'vue'
import Vuex from 'vuex'
import Helper from './helper'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Regions: null,
    Centers: null,
    Class: null,
    Students: null
  },
  getters: {
    getRegions(state){
      return state.Regions;
    }
  },
  mutations: {
    SET_REGION(state, regions) {
      state.Regions = regions;
      console.log(state);
    },
    SET_CENTER(state, dataCenter){
      state.Centers = dataCenter;
    }
  },
  actions: {
    getRegions({ commit }) {
      Helper.GetRegions().then(res => {
        commit('SET_REGION', res.data);
      })
    },
    getCenters({commit},regionids:string[]){
      if(regionids && regionids.length > 0){
        Helper.GetCenters(regionids[0]).then(res=>{
          commit('SET_CENTER',res.data);
        })
      }
    }
  },
  modules: {
  }
})
