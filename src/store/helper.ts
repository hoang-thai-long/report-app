import {configs, instance} from './request';

const Helper = {
    GetRegions(){
        return instance.get(configs.GET_REGIONS);
    },
    GetCenters(regionid:string){
        return instance.get(configs.GET_CENTERS+"?regionid="+regionid);
    }
}

export default Helper;