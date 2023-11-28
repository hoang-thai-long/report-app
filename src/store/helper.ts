import store from '.';
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
        let url =configs.GET_REGIONS+"?userid="+store.state.User.ID+"&userType="+store.state.User.Type+"&centerCode="+store.state.CenterCode;
        if(store.state.FilterLevel){
            url +="&level="+store.state.FilterLevel
        }
        return instance.get(url);
    },
    GetCenters(regionid:string,start:Date, end : Date){
        let url =configs.GET_CENTERS+"?regionid="+regionid+"&userid="+store.state.User.ID+"&userType="+store.state.User.Type+"&centerCode="+store.state.CenterCode;
        if(store.state.FilterLevel){
            url +="&level="+store.state.FilterLevel
        }
        if(start){
            url += "&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate()
        }
        if(end){
            url += "&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate()
        }
        return instance.get(url);
    },
    GetClass(centerid:string, start:Date, end : Date){
        let url = configs.GET_CLASS+"?centerid="+centerid+"&userid="+store.state.User.ID+"&userType="+store.state.User.Type+"&centerCode="+store.state.CenterCode;
        if(store.state.FilterLevel){
            url +="&level="+store.state.FilterLevel
        }
        if(start){
            url += "&start="+start.getFullYear()+"-"+(start.getMonth()+1)+"-"+start.getDate()
        }
        if(end){
            url += "&end="+end.getFullYear()+"-"+(end.getMonth()+1)+"-"+end.getDate()
        }
        return instance.get(url);
    },
    GetTuLuyen(classid:string, start:Date, end:Date, type:number){
        let url = configs.TULUYEN;
        url += "?id="+classid +"&userid="+store.state.User.ID+"&userType="+store.state.User.Type;
        if(store.state.FilterLevel){
            url +="&level="+store.state.FilterLevel
        }
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
        url += "?id="+classid +"&userid="+store.state.User.ID+"&userType="+store.state.User.Type;
        if(store.state.FilterLevel){
            url +="&level="+store.state.FilterLevel
        }
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
        url += "?id="+classid +"&userid="+store.state.User.ID+"&userType="+store.state.User.Type;
        if(store.state.FilterLevel){
            url +="&level="+store.state.FilterLevel
        }
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
        url += "?id="+classid +"&userid="+store.state.User.ID+"&userType="+store.state.User.Type;
        if(store.state.FilterLevel){
            url +="&level="+store.state.FilterLevel
        }
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
        url += "?id="+classid +"&userid="+store.state.User.ID+"&userType="+store.state.User.Type;
        if(store.state.FilterLevel){
            url +="&level="+store.state.FilterLevel
        }
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
        let url = configs.GET_BAIKIEMTRA+"?id="+classid +"&userid="+store.state.User.ID+"&userType="+store.state.User.Type;
        if(store.state.FilterLevel){
            url +="&level="+store.state.FilterLevel
        }
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
        let url = configs.GET_BAILUYENTAP+"?id="+classid +"&userid="+store.state.User.ID+"&userType="+store.state.User.Type;
        if(store.state.FilterLevel){
            url +="&level="+store.state.FilterLevel
        }
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