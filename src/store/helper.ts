import {configs, instance} from './request';

const Helper = {
    GetStudents(id:string){
        const url = configs.GET_STUDENT+"?id="+id
        return instance.get(url);
    },
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
    GetTuLuyen(classid:string, start:Date, end:Date, type:number){
        let url = configs.TULUYEN;
        url += "?id="+classid;
        url+= "&type="+type.toString();
        if(start){
            url += "&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate()
        }
        if(end){
            url += "&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate()
        }

        return instance.get(url)
    },
    GetLuyenTap(classid:string, start:Date, end:Date, type:number){
        let url = configs.BAILUYENTAP;
        url += "?id="+classid;
        url+= "&type="+type.toString();
        if(start){
            url += "&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate()
        }
        if(end){
            url += "&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate()
        }

        return instance.get(url)
    },
    GetBaiKiemTra(classid:string, start:Date, end:Date, type:number){
        let url = configs.BAIKIEMTRA;
        url += "?id="+classid;
        url+= "&type="+type.toString();
        if(start){
            url += "&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate()
        }
        if(end){
            url += "&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate()
        }

        return instance.get(url)
    },
    GetLink(classid:string, start:Date, end:Date, type:number){
        let url = configs.BAILINK;
        url += "?id="+classid;
        url+= "&type="+type.toString();
        if(start){
            url += "&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate()
        }
        if(end){
            url += "&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate()
        }

        return instance.get(url)
    },
    GetKhaoThi(classid:string, start:Date, end:Date, type:number){
        let url = configs.BAIKHAOTHI;
        url += "?id="+classid;
        url+= "&type="+type.toString();
        if(start){
            url += "&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate()
        }
        if(end){
            url += "&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate()
        }
        

        return instance.get(url)
    },
    LoadBaiKiemTra(classid:string, start : Date, end :Date,type:number){
        let url = configs.GET_BAIKIEMTRA+"?id="+classid;
        url += "&type="+type.toString();
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