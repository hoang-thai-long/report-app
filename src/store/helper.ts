import {configs, instance} from './request';

const Helper = {
    CountClass(id:string,type:number, start:Date|null, end:Date|null){
        let url = configs.COUNT_CLASS+"?id="+id+"&type="+type;
        if(start){
            url+="&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate();
        }
        if(end){
            url+="&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate();
        }
        return instance.get(url);
    },
    GetRegions(){
        return instance.get(configs.GET_REGIONS);
    },
    GetCenters(regionid:string){
        return instance.get(configs.GET_CENTERS+"?regionid="+regionid);
    },
    GetClass(centerid:string){
        return instance.get(configs.GET_CLASS+"?centerid="+centerid);
    },
    LoadBaiKiemTra(classid:string, start : Date, end :Date){
        let url = configs.GET_BAIKIEMTRA+"?id="+classid;
        if(start){
            url+="&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate();
        }
        if(end){
            url+="&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate();
        }
        return instance.get(url);
    },
    LoadBaiLuyenTap(classid:string, start : Date, end :Date){
        let url = configs.GET_BAILUYENTAP+"?id="+classid;
        if(start){
            url+="&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate();
        }
        if(end){
            url+="&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate();
        }
        return instance.get(url);
    }
}

export default Helper;