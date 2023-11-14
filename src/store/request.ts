import axios from 'axios';
const configs = {
    BASE_URL:"https:/localhost:56456/data/",
    GET_REGIONS:'GetRegions',
    GET_CENTERS:'GetCenters',
    GET_CLASS :'GetClass',
    BAIKIEMTRA:'BAIKIEMTRA',
    BAILUYENTAP:'BAILUYENTAP',
    BAILINK:'BAILINK',
    TULUYEN:'TULUYEN',
    BAIKHAOTHI:'BAIKHAOTHI'
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