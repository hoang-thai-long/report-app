import axios from 'axios';
const configs = {
    BASE_URL:"https://report.eduso.vn/data/",
    GET_REGIONS:'GetRegions',
    GET_CENTERS:'GetCenters',
    GET_CLASS :'GetClass',
    BAIKIEMTRA:'BAIKIEMTRA',
    BAILUYENTAP:'BAILUYENTAP',
    BAILINK:'BAILINK',
    TULUYEN:'TULUYEN',
    BAIKHAOTHI:'BAIKHAOTHI',
    COUNT_CLASS:"CountCLASS",
    GET_BAIKIEMTRA:"BAIKIEMTRA",
    GET_BAILUYENTAP:"BAILUYENTAP",
    GET_STUDENT:"GetStudent"
}

const instance = axios.create({
    baseURL: configs.BASE_URL
});

instance.interceptors.request.use((config)=>config,(error)=> Promise.reject(error))

instance.interceptors.response.use((res)=> res,(err)=> Promise.reject(err));

const ExportExcel = function(dataTable:{thead:{row:number,col:number,text:string,color:string}[][],tbody:{row:number,col:number,text:string,color:string}[][]},url:string){
    axios.post(url,dataTable).then((result)=>{
        if (result.status == 200) {
            const link = result.data;
            window.open(link, "_blank");
        }
    })
}

export {
    configs,
    instance,
    ExportExcel
};