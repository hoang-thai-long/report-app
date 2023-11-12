import {configs, instance} from './request';

const Helper = {
    GetRegions(){
        return instance.get(configs.GET_REGIONS);
    },
    GetCenters(regionid:string){
        return instance.get(configs.GET_CENTERS+"?regionid="+regionid);
    },
    GetClass(centerid:string){
        return instance.get(configs.GET_CLASS+"?centerid="+centerid);
    }
}

export default Helper;