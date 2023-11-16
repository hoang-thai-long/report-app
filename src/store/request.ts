import axios from 'axios';
const configs = {
    BASE_URL:"https://localhost:7201/data/",
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

export {
    configs,
    instance
};