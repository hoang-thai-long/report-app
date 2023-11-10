import TableReport from "./components/TableReport.vue"

const ReportPlugins =  {
    install(vue:any,options:any){
        if(options){
            console.log(options);
        }
        vue.component('table-report',TableReport)
    }
}

const useLibrary = function(vue:any){
    vue.use(TableReport)
}

if (typeof window !== 'undefined' && window.Vue) {
    useLibrary(window.Vue);
}

export default ReportPlugins;