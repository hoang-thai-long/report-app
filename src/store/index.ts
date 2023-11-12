import Vue from 'vue'
import Vuex from 'vuex'
import Helper from './helper'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Regions: null,
    Centers: null,
    Class: null,
    Students: null,
    Levels:[{id:"1",name:"lớp 1"},{id:"2",name:"lớp 2"},{id:"3",name:"lớp 4"},{id:"5",name:"lớp 5"},{id:"6",name:"lớp 6"},{id:"7",name:"lớp 8"},{id:"9",name:"lớp 9"},{id:"10",name:"lớp 10"},{id:"11",name:"lớp 11"},{id:"12",name:"lớp 12"},{id:"0",name:"Đại học"}]
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
    },
    SET_LEVEL(state, levels){
      state.Levels = levels;
    },
    SET_CLASS(state, dataClass){
      state.Class = dataClass
    }
  },
  actions: {
    getRegions({ commit }) {
      Helper.GetRegions().then(res => {
        commit('SET_REGION', res.data);
      })
    },
    getCenters({commit},regionids:string){
      if(regionids && regionids.length > 0){
        Helper.GetCenters(regionids).then(res=>{
          commit('SET_CENTER',res.data);
        })
      }
    },
    getClass({commit},centerid:string){
      if(centerid && centerid.length > 0){
        Helper.GetClass(centerid).then(res=>{
          commit('SET_CLASS',res.data);
        })
      }
    }
  },
  modules: {
  }
})
