import axios from 'axios';
const configs = {
    BASE_URL:"https:/localhost:56456/data/",
    GET_REGIONS:'GetRegions',
    GET_CENTERS:'GetCenters',
    GET_CLASS :'GetClass'
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