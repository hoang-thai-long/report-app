import TableReport from "./components/TableReport.vue"
import store from '@/store';
import Vue from 'vue';

const ReportPlugins =  {
    install(vue: typeof Vue){
        vue.prototype.$store = store;
        vue.component('table-report',TableReport)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.config.productionTip = false
    window.Vue.use(ReportPlugins);
}

export default ReportPlugins;