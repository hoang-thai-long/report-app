import Vue from 'vue'
import Vuex from 'vuex'
import Helper from './helper'

Vue.use(Vuex)

const LuyenTap : {Link:any[],Class:any[],TuLuyen:any[]} = {Link : [],Class : [],TuLuyen : []};

const kiemTra : {Class : any[],Exam :any[] } = {Class : [], Exam :[]};



const TypeDataView : {[key:string]:{id:string,name:string}[]} = {};
TypeDataView["longht"] =  [{id:"1",name:"hai"}]
export default new Vuex.Store({
  state: {
    LuyenTap:LuyenTap,
    kiemTra:kiemTra,
    DataView:TypeDataView,
    FilterTable: null,
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
    SET_DATA_VIEW(state, dataView:{id:string,centers:{id:string,name:string}[]}){
      state.DataView[dataView.id] = dataView.centers;
    },
    SET_DATA(state, filterData:number){
      switch(filterData){
        case 3: 
          state.FilterTable = state.Students;
          break;
        case 2:
          state.FilterTable = state.Class;
          break;
        case 1: 
          state.FilterTable = state.Centers;
          break;
        default:
          state.FilterTable = state.Regions;
          break;
      }
    },
    SET_REGION(state, regions) {
      state.Regions = regions;
      // console.log(state);
    },
    SET_CENTER(state, dataCenter){
      state.Centers = dataCenter;
    },
    SET_LEVEL(state, levels){
      state.Levels = levels;
    },
    SET_CLASS(state, dataClass){
      state.Class = dataClass
    },
    SET_DATA_TULUYEN(state,data){
      state.LuyenTap.TuLuyen.push(data);
    },
    SET_DATA_LUYEN_TAP(state,data){
      state.LuyenTap.Class.push(data);
    },
    SET_DATA_LINK(state,data){
      state.LuyenTap.Link.push(data);
    },
    SET_DATA_KIEM_TRA(state,data){
      state.kiemTra.Class.push(data);
    },
    SET_DATA_KHAO_THI(state,data){
      state.kiemTra.Exam.push(data);
    },
  },
  actions: {
    setData({commit}, data:number){
      commit('SET_DATA',data)
    },
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
    },
    getTuLuyen({commit},data:{classid:string, start: Date, end :Date}){
      if(data.classid){
        Helper.GetTuLuyen(data.classid,data.start,data.end).then(res=>{
          console.log(res)
          if(res.data){
            commit("SET_DATA_TULUYEN",res.data);
          }
        })
      }
    },
    getLuyenTap({commit},data:{classid:string, start: Date, end :Date}){
      if(data.classid){
        Helper.GetLuyenTap(data.classid,data.start,data.end).then(res=>{
          console.log(res)
          if(res.data){
            commit("SET_DATA_LUYEN_TAP",res.data);
          }
        })
      }
    },
    getKiemTra({commit},data:{classid:string, start: Date, end :Date}){
      if(data.classid){
        Helper.GetBaiKiemTra(data.classid,data.start,data.end).then(res=>{
          console.log(res)
          if(res.data){
            commit("SET_DATA_KIEM_TRA",res.data);
          }
        })
      }
    },
    getLink({commit},data:{classid:string, start: Date, end :Date}){
      if(data.classid){
        Helper.GetLink(data.classid,data.start,data.end).then(res=>{
          console.log(res)
          if(res.data){
            commit("SET_DATA_LINK",res.data);
          }
        })
      }
    },
    getKhaoThi({commit},data:{classid:string, start: Date, end :Date}){
      if(data.classid){
        Helper.GetKhaoThi(data.classid,data.start,data.end).then(res=>{
          console.log(res)
          if(res.data){
            commit("SET_DATA_KHAO_THI",res.data);
          }
        })
      }
    }
  },
  modules: {
  }
})
