import TableReport from "./components/TableReport.vue"
import store from '@/store';

const ReportPlugins =  {
    install(vue:any,options:any){
        if(options){
            console.log(options);
        }
        vue.prototype.$store = store;
        vue.component('table-report',TableReport)
    }
}

const useLibrary = function(vue:any){
    vue.use(ReportPlugins)
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.config.productionTip = false
    useLibrary(window.Vue);
}

export default ReportPlugins;