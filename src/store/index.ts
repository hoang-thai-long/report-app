import Vue from 'vue'
import Vuex from 'vuex'
import Helper from './helper';

Vue.use(Vuex)
interface typeExam {
  siSo: number,
  totalLesson: number,
  classID: string,
  tyleThamGia: number,
  times: number,
  points: number,
  studentIDs: string[] | null,
  details:{name:string,id:string,tyLeThamGia:number,diem:number,thoiGian:number}[]
}
interface typeTuLuyen {
  id: string,
  siso: number,
  hstg: string[]|null,
  tltg: number,
  tgtl: number,
  qtt: number,
  ds:{name:string,id:string,questionTotal:number,timeTotal:number}[]
}

interface ITeacherView {id:string,name:string, classIDs:string[]}

const LuyenTap: { Link: typeExam[], Class: typeExam[], TuLuyen: typeTuLuyen[] } = { Link: [], Class: [], TuLuyen: [] };
const kiemTra: { Class: typeExam[], Exam: typeExam[] } = { Class: [], Exam: [] };
const TypeDataView: { [key: string]: { id: string, name: string }[] } = {};
const DataType :{ id: string, name: string, centerID: string, regionID: string, level:string }[] | null = [];
const levels = [{ id: "1", name: "Khối 1" }, { id: "2", name: "Khối 2" }, { id: "3", name: "Khối 4" }, { id: "5", name: "Khối 5" }, { id: "6", name: "Khối 6" }, { id: "7", name: "Khối 8" }, { id: "9", name: "Khối 9" }, { id: "10", name: "Khối 10" }, { id: "11", name: "Khối 11" }, { id: "12", name: "Khối 12" }, { id: "0", name: "Đại học" }];
const DataClassModel :{ id: string, name: string, centerID: string, regionID: string, level:string }[] = [];



const TeacherView : ITeacherView = {id:"",name:"",classIDs:[]};
const TypeListTeacher : ITeacherView[] = [];
export default new Vuex.Store({
  state: {
    TeacherView:TeacherView,
    ListTeachers:TypeListTeacher,
    CenterCode:'',
    FilterLevel:'',
    User:{
      ID:'',
      Type:false
    },
    FilterClass:'',
    DataClass:DataClassModel,
    View:0,
    Type:-1,
    LuyenTap: LuyenTap,
    kiemTra: kiemTra,
    DataView: TypeDataView,
    FilterTable: DataType,
    Regions: DataType,
    Centers: DataType,
    Class: DataType,
    Students: DataType,
    Levels: levels
  },
  getters: {
    getRegions(state) {
      return state.Regions;
    }
  },
  mutations: {
    SET_TEACHER_VIEW(state,teacherView){
      state.TeacherView = teacherView;
      if(state.Type == 1){
        const data = state.Class.concat();
        if(state.TeacherView && state.TeacherView.id.length > 10){
          if(state.FilterLevel)
          state.FilterTable = data.filter(o=>o.level == state.FilterLevel && state.TeacherView.classIDs.includes(o.id));
          else
          state.FilterTable = data.filter(o=>state.TeacherView.classIDs.includes(o.id));
        }
        else{
          if(state.FilterLevel)
          state.FilterTable = data.filter(o=>o.level == state.FilterLevel);
          else
          state.FilterTable = data;
        }
      }
    },
    SET_CENTER_CODE(state,centerCode){
      state.CenterCode = centerCode;
    },
    SET_LEVEL_DATA(state,data){
      state.FilterLevel = data;
      if(state.Type == 1){
        const data = state.Class.concat();
        if(state.FilterLevel){
          if(state.TeacherView && state.TeacherView.id.length > 10)
          state.FilterTable = data.filter(o=>o.level == state.FilterLevel && state.TeacherView.classIDs.includes(o.id));
          else
          state.FilterTable = data.filter(o=>o.level == state.FilterLevel);
        }
        else{
          if(state.TeacherView && state.TeacherView.id.length > 10)
          state.FilterTable = data.filter(o=>state.TeacherView.classIDs.includes(o.id));
          else
          state.FilterTable = data;
        }
        
      }
    },
    SET_USER_ID(state,data){
      state.User = data;
    },
    SET_DATA_VIEW(state, dataView: { id: string, centers: { id: string, name: string }[] }) {
      state.DataView[dataView.id] = dataView.centers;
    },
    SET_DATA(state, filterData: number) {
      state.Type = filterData;
      switch (filterData) {
        case 2:
          state.FilterTable = state.Students;
          break;
        case 1:
          if(state.FilterLevel){
            const data = state.Class.concat();
            state.FilterTable = data.filter(o=>o.level == state.FilterLevel);
          }
          else{
            state.FilterTable = state.Class;
          }
          break;
        case 0:
          state.FilterTable = state.Centers;
          break;
        default:
          state.FilterTable = state.Regions;
          break;
      }
    },
    SET_STUDENT(state,data){
      state.Students = data;
    },
    SET_REGION(state, regions) {
      state.Regions = regions;
      // console.log(state);
    },
    SET_CENTER(state, dataCenter) {
      state.Centers = dataCenter;
    },
    SET_LEVEL(state, levels) {
      state.Levels = levels;
    },
    SET_CLASS(state, dataClass) {
      if(dataClass){
        state.Class = dataClass.listClass;
        state.ListTeachers = dataClass.listTeacher;
        if(state.Class != null && state.Class.length > 0){
          state.Levels = levels.filter(o=>state.Class.map(x=>x.level).includes(o.id));
        }
        else{
          state.Levels = levels;
        }
      }
      else{
        state.ListTeachers = [];
        state.Class = [];
        state.Levels = levels;
      }
    },
    SET_DATA_TULUYEN(state, data) {
      state.LuyenTap.TuLuyen.push(data);
    },
    SET_DATA_LUYEN_TAP(state, data) {
      state.LuyenTap.Class.push(data);
    },
    SET_DATA_LINK(state, data) {
      state.LuyenTap.Link.push(data);
    },
    SET_DATA_KIEM_TRA(state, data) {
      state.kiemTra.Class.push(data);
    },
    SET_DATA_KHAO_THI(state, data) {
      state.kiemTra.Exam.push(data);
    },
    CLEAR_DATA(state) {
      console.log(state);
      state.kiemTra = { Class: [], Exam: [] };
      state.LuyenTap = { Link: [], Class: [], TuLuyen: [] };
    },
    SET_VIEW(state,view:number){
      state.View = view;
    },
    SET_DATA_ClASS(state,data){
      if(data && data.length > 0){
        state.DataClass = state.DataClass.concat(data);
        // state.Levels = levels.filter(x=> state.DataClass.map(o=>o.level).includes(x));
      }
    },
    CLEAR_DATA_CLASS(state){
      state.DataClass = [];
    },
    SET_CLASS_FILTER(state,value){
      state.FilterClass = value;
    }
  },
  actions: {
    setUseID({commit},data:{ID:string,Type:boolean}){
      commit('SET_USER_ID',data);
    },
    clearDataClass({commit}){
      commit("CLEAR_DATA_CLASS")
    },
    setClassRegion({commit},data){
      commit("SET_DATA_ClASS",data)
    },
    changeView({commit},view){
      commit('SET_VIEW',view.id);
    },
    clearData({ commit }) {
      commit('CLEAR_DATA');
    },
    setData({ commit }, data: number) {
      commit('SET_DATA', data)
    },
    getRegions({ commit }) {
      Helper.GetRegions().then(res => {
        commit('SET_REGION', res.data);
      })
    },
    getCenters({ commit }, data:{id:string, start: Date, end : Date}) {
      Helper.GetCenters(data.id,data.start,data.end).then(res => {
        commit('SET_CENTER', res.data);
      })
    },
    getClass({ commit }, data:{id:string, start: Date, end : Date}) {
      Helper.GetClass(data.id,data.start, data.end).then(res => {
        commit('SET_CLASS', res.data);
      })
    },
    getStudents({commit},classid:string){
      Helper.GetStudents(classid).then(res=>{
        commit("SET_STUDENT",res.data)
      })
    },
    getTuLuyen({ commit }, data: { classid: string, start: Date, end: Date, type: number}) {
      const instance =  Helper.GetTuLuyen(data.classid, data.start, data.end,data.type)
        instance.then(res => {
          // console.log(res)
          if (res.data) {
            commit("SET_DATA_TULUYEN", res.data);
          }
        })
        return instance;
    },
    getLuyenTap({ commit }, data: { classid: string, start: Date, end: Date, type: number }) {
      const instance = Helper.GetLuyenTap(data.classid, data.start, data.end,data.type)
        instance.then(res => {
          // console.log(res)
          if (res.data) {
            commit("SET_DATA_LUYEN_TAP", res.data);
          }
        })
        return instance;
    },
    getKiemTra({ commit }, data: { classid: string, start: Date, end: Date, type: number }) {
      const instance = Helper.GetBaiKiemTra(data.classid, data.start, data.end,data.type)
      instance.then(res => {
        // console.log(res)
        if (res.data) {
          commit("SET_DATA_KIEM_TRA", res.data);
        }
      })

      return instance;
    },
    getLink({ commit }, data: { classid: string, start: Date, end: Date, type: number }) {
      const instance = Helper.GetLink(data.classid, data.start, data.end,data.type)
      instance.then(res => {
        // console.log(res)
        if (res.data) {
          commit("SET_DATA_LINK", res.data);
        }
      })
      return instance;
    },
    getKhaoThi({ commit }, data: { classid: string, start: Date, end: Date, type: number }) {
      const instance = Helper.GetKhaoThi(data.classid, data.start, data.end,data.type)
      instance.then(res => {
        // console.log(res)
        if (res.data) {
          commit("SET_DATA_KHAO_THI", res.data);
        }
      })

      return instance;
    }
  },
  modules: {
  }
})
