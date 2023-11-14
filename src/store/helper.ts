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
    },
    GetTuLuyen(classid:string, start:Date, end:Date){
        let url = configs.TULUYEN;
        url += "?classid="+classid;
        if(start){
            url += "&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate()
        }
        if(end){
            url += "&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate()
        }

        return instance.get(url)
    },
    GetLuyenTap(classid:string, start:Date, end:Date){
        let url = configs.BAILUYENTAP;
        url += "?classid="+classid;
        if(start){
            url += "&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate()
        }
        if(end){
            url += "&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate()
        }

        return instance.get(url)
    },
    GetBaiKiemTra(classid:string, start:Date, end:Date){
        let url = configs.BAIKIEMTRA;
        url += "?classid="+classid;
        if(start){
            url += "&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate()
        }
        if(end){
            url += "&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate()
        }

        return instance.get(url)
    },
    GetLink(classid:string, start:Date, end:Date){
        let url = configs.BAILINK;
        url += "?classid="+classid;
        if(start){
            url += "&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate()
        }
        if(end){
            url += "&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate()
        }

        return instance.get(url)
    },
    GetKhaoThi(classid:string, start:Date, end:Date){
        let url = configs.BAIKHAOTHI;
        url += "?classid="+classid;
        if(start){
            url += "&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate()
        }
        if(end){
            url += "&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate()
        }

        return instance.get(url)
    },
}

export default Helper;