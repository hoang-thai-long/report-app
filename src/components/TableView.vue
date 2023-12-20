
<template>
    <div class="table-data">
        <div class="table-data-box">
            <table id="report-table" class="table table-striped table-bordered table-report-table">
                <thead style="position: sticky; top: 0px; background-color: #fff;">
                    <tr>
                        <th rowspan="3"
                            style="border-bottom: 1px solid #000000;border-left: 1px solid #000000;border-right:1px solid #000000; border-top: 1px solid #000000;">
                            STT</th>
                        <th rowspan="3" style="border-bottom: 1px solid #000000;border-right:1px solid #000000; border-top: 1px solid #000000;">Tên</th>
                        <!-- tổng hợp -->
                        <template v-if="$store.state.View == 0 || $store.state.View == 3">
                            <th style="border-bottom: 1px solid #000000;border-right:1px solid #000000; border-top: 1px solid #000000;"
                                :colspan="$store.state.Type == 2 ? '1' : '4'">Tổng hợp</th>
                        </template>
                        <!--  luyện tập -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <th style="border-bottom: 1px solid #000000;border-right:1px solid #000000; border-top: 1px solid #000000;" colspan="6">Luyện tập
                            </th>
                        </template>
                        <!-- kiểm tra -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <th style="border-bottom: 1px solid #000000;border-right:1px solid #000000; border-top: 1px solid #000000;"
                                :colspan="$store.state.Type == 2 ? '4' : '6'">Kiểm tra</th>
                        </template>
                    </tr>
                    <tr>
                        <!-- tổng hợp -->
                        <template v-if="$store.state.View == 0 || $store.state.View == 3">
                            <template v-if="$store.state.Type == 2">
                                <th style="border-bottom: 1px solid #000000; border-top: 1px solid #000000; border-right: 1px solid #000000;" rowspan="2"> Tổng thời gian hoạt động </th>
                            </template>
                            <template v-else>
                                <th style="border-bottom: 1px solid #000000;" rowspan="2">Tổng HS</th>
                                <th style="border-bottom: 1px solid #000000;" rowspan="2">Số HS hoạt động</th>
                                <th style="border-bottom: 1px solid #000000;" rowspan="2">Tỷ lệ</th>
                                <th style="border-bottom: 1px solid #000000; border-right: 1px solid #000000;" rowspan="2">Thời gian hoạt động trung bình</th>
                            </template>

                        </template>
                        <!--  luyện tập -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <th style="border-right: 1px solid #000000;" colspan="2">Được giao qua link</th>
                            <th style="border-right: 1px solid #000000;" colspan="2">Được GV giao trong lớp</th>
                            <th style="border-right: 1px solid #000000;" colspan="2">Tự luyện</th>
                        </template>
                        <!-- kiểm tra -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <th style="border-right: 1px solid #000000;"
                                :colspan="$store.state.Type == 2 ? '2' : '3'">Bài kiểm tra trong lớp</th>
                            <th style="border-right: 1px solid #000000;"
                                :colspan="$store.state.Type == 2 ? '2' : '3'">Bài kiểm tra trên khảo thí</th>
                        </template>
                    </tr>
                    <tr v-if="$store.state.View == 1 || $store.state.View == 3 || $store.state.View == 2">
                        <!--  luyện tập -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <th style="border-bottom: 1px solid #000000; border-top: 1px solid #000000;">{{ $store.state.Type == 2 ? 'Tỷ lệ hoàn thành' : 'Tỷ lệ làm bài' }}</th>
                            <th style="border-bottom: 1px solid #000000; border-right: 1px solid #000000; border-top: 1px solid #000000;">{{ $store.state.Type == 2 ? 'Tổng thời gian luyện tập' : 'Thời gian LT TB' }}</th>

                            <th style="border-bottom: 1px solid #000000; border-top: 1px solid #000000;">{{ $store.state.Type == 2 ? 'Tỷ lệ hoàn thành' : 'Tỷ lệ làm bài' }}</th>
                            <th style="border-bottom: 1px solid #000000; border-right: 1px solid #000000; border-top: 1px solid #000000;">{{ $store.state.Type == 2 ? 'Tổng thời gian luyện tập' : 'Thời gian LT TB' }}</th>

                            <th style="border-bottom: 1px solid #000000; border-top: 1px solid #000000;">{{ $store.state.Type == 2 ? 'Tổng số câu tự luyện' : 'Tỷ lệ làm bài' }}</th>
                            <th style="border-bottom: 1px solid #000000; border-right: 1px solid #000000; border-top: 1px solid #000000;">{{ $store.state.Type == 2 ? 'Tổng thời gian luyện tập' : 'Thời gian LT TB' }}</th>
                        </template>
                        <!-- kiểm tra -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <th style="border-top: 1px solid #000000; border-bottom: 1px solid #000000;" v-if="$store.state.Type != 2">Tỷ lệ làm bài</th>
                            <th style="border-top: 1px solid #000000; border-bottom: 1px solid #000000;">Điểm TB</th>
                            <th style="border-right: 1px solid #000000; border-top: 1px solid #000000; border-bottom: 1px solid #000000;">{{ $store.state.Type == 2 ? 'Thời gian làm bài TB'
                                : 'Thời gian LT TB' }}</th>
                            <th style="border-top: 1px solid #000000; border-bottom: 1px solid #000000;" v-if="$store.state.Type != 2">Tỷ lệ làm bài</th>
                            <th style="border-top: 1px solid #000000; border-bottom: 1px solid #000000;">Điểm TB</th>
                            <th style="border-right: 1px solid #000000; border-top: 1px solid #000000; border-bottom: 1px solid #000000;">{{ $store.state.Type == 2 ? 'Thời gian làm bài TB'
                                : 'Thời gian LT TB' }}</th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in getDataFilter()" :key="i">
                        <td style="border-left: 1px solid #000000; border-right:1px solid #000000;">{{ (i + 1) }}</td>
                        <td style="border-right: 1px solid #000000; text-align: left; white-space: nowrap;">{{ item.name.replace("lớp","").replace("Lớp","").replace("LỚP","").replace("Lớp ","") }}</td>
                        <!-- tổng hợp -->
                        <template v-if="$store.state.View == 0 || $store.state.View == 3">
                            <td v-for="(td, k) in getTongHop(item.id)" :key="'total' + k" :style="td.style">{{ td.text }}</td>
                        </template>
                        <!-- link -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <td v-for="(td, k) in getLink(item.id)" :key="'link' + k" :style="td.style">{{ td.text }}</td>
                        </template>
                        <!--  luyện tập -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <td v-for="(td, k) in getLuyenTap(item.id)" :key="'lt' + k" :style="td.style">{{ td.text }}</td>
                        </template>
                        <!--tự luyện -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <td v-for="(td, k) in getTuLuyen(item.id)" :key="'tl' + k" :style="td.style">{{ td.text }}</td>
                        </template>

                        <!-- kiểm tra -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <td v-for="(td, k) in getKiemTra(item.id)" :key="'bg' + k" :style="td.style">{{ td.text }}</td>
                        </template>

                        <!-- khao thi -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <td v-for="(td, k) in getKhaoThi(item.id)" :key="'kt' + k" :style="td.style">{{ td.text }}</td>
                        </template>
                    </tr>
                    <tr style="position: sticky;z-index: 10;bottom: 0px;box-shadow: 0px -6px 10px #3f51b54f;font-weight: 700; background-color: #ffffff;" v-if="$store.state.loadding === 0">
                        <td style="border: 1px solid #000000;" colspan="2">Tổng kết</td>
                        <td v-for="(td,k) in getTongKet()" :key="'tk' + k" :style="td.style" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000;">{{ td.text }}</td>
                    </tr>
                    <tr v-else style="color: #ccc;">
                        <td style="border-left: 1px solid #000000; border-right:1px solid #000000;" colspan="2">Tổng kết</td>
                        <td v-for="(data) in getDataSeke()" :key="'loading'+data" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000;"><span class="loading"></span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts">
import store from '@/store';
import { typeExam, typeTuLuyen } from '@/utils/model';
import { Component, Prop, Vue } from 'vue-property-decorator';
// import { computed } from 'vue';

@Component
export default class extends Vue {
    @Prop()
    type !: number;

    getDataSeke(){
        if(store.state.Type == 2){
            if(store.state.View == 0) // tỏng hợp
            return [1];
            if(store.state.View == 1) // tự luyện
            return [1,2,3,4,5,6]
            if(store.state.View == 2) // kiểm tra
            return [1,2,3,4]
            if(store.state.View == 3) // tất cả
            return [1,2,3,4,5,6,7,8,9,10,11];
        }
        else{
            if(store.state.View == 0) return [1,2,3,4]
            if(store.state.View == 1) return [1,2,3,4,5,6]
            if(store.state.View == 2) return [1,2,3,4,5,6]
            if(store.state.View == 3) return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
        }
    }

    public getDataFilter(){
        let data = store.state.FilterTable.concat();
        if(store.state.Type == 1){
            if(store.state.FilterLevel){
                data = data.filter(o=>o.level == store.state.FilterLevel);
            }
            if(store.state.TeacherView && store.state.TeacherView.id.length > 10){
                data = data.filter(o=>store.state.TeacherView.classIDs.includes(o.id));
            }
        }
        return data;
    }

    public getListClass(id: string) {
        let data: { id: string, name: string, centerID: string, regionID: string, level: string }[] = [];
        switch (store.state.Type) {
            case 1:
                // lay 1 lopws
                data = [{ id: id, name: "", regionID: "", centerID: "", level: "" }];
                break;
            case 0: // center
                data = store.state.DataClass.filter((o => o.centerID == id));
                break;
            default:
                data = store.state.DataClass.filter((o => o.regionID == id));
                break;
        }
        return data;
    }
    public getTongHop(id: string) {
        if (store.state.Type == 2) {
            let tghd: number[] = [];

            const linkData = store.state.LuyenTap.Link.find(o => o.classID == store.state.FilterClass);
            const luyenTapData = store.state.LuyenTap.Class.find(o => o.classID == store.state.FilterClass);
            const kiemTraData = store.state.kiemTra.Class.find(o => o.classID == store.state.FilterClass);
            const khaoThiData = store.state.kiemTra.Exam.find(o => o.classID == store.state.FilterClass);
            const tuLuyenData = store.state.LuyenTap.TuLuyen.find(o => o.id == store.state.FilterClass);

            if (linkData && linkData.details && linkData.details.length > 0) {
                var dataStudentLink = linkData.details.find((o: { diem: number, id: string, tyLeThamGia: number, thoiGian: number }) => o.id == id);
                if (dataStudentLink) {
                    if (dataStudentLink.tyLeThamGia > 0) {
                        tghd.push(dataStudentLink.thoiGian)
                    }
                }
            }
            if (luyenTapData && luyenTapData.details && luyenTapData.details.length > 0) {
                var dataStudentLuyenTap = luyenTapData.details.find((o: { diem: number, id: string, tyLeThamGia: number, thoiGian: number }) => o.id == id);
                if (dataStudentLuyenTap) {
                    if (dataStudentLuyenTap.tyLeThamGia > 0) {
                        tghd.push(dataStudentLuyenTap.thoiGian)
                    }
                }
            }
            if (kiemTraData && kiemTraData.details && kiemTraData.details.length > 0) {
                var dataStudentKiemTra = kiemTraData.details.find((o: { diem: number, id: string, tyLeThamGia: number, thoiGian: number }) => o.id == id);
                if (dataStudentKiemTra) {
                    if (dataStudentKiemTra.tyLeThamGia > 0) {
                        tghd.push(dataStudentKiemTra.thoiGian)
                    }
                }
            }
            if (khaoThiData && khaoThiData.details && khaoThiData.details.length > 0) {
                var dataStudentKhaoThi = khaoThiData.details.find((o: { diem: number, id: string, tyLeThamGia: number, thoiGian: number }) => o.id == id);
                if (dataStudentKhaoThi) {
                    if (dataStudentKhaoThi.tyLeThamGia > 0) {
                        tghd.push(dataStudentKhaoThi.thoiGian)
                    }
                }
            }
            if (tuLuyenData && tuLuyenData.ds && tuLuyenData.ds.length > 0) {
                var dataStudentTuLuyen = tuLuyenData.ds.find(o => o.id == id);
                if (dataStudentTuLuyen) {
                    if (dataStudentTuLuyen.questionTotal > 0) {
                        tghd.push(dataStudentTuLuyen.timeTotal)
                    }
                }
            }
            if (tghd && tghd.length > 0) {
                return [{
                    text: tghd.reduce((a, b) => a + b, 0).toFixed(1),
                    style: 'border-right: 1px solid #000000;text-align: center'
                }];
            }
            return [{
                text: "---",
                style: 'border-right: 1px solid #000000;text-align: center'
            }];
        }

        let dataStudens: string[] = [];
        let tghd = 0;
        let siso = 0;

        const linkData = store.state.LuyenTap.Link.find(o => o.classID == id);
        const luyenTapData = store.state.LuyenTap.Class.find(o => o.classID == id);
        const kiemTraData = store.state.kiemTra.Class.find(o => o.classID == id);
        const khaoThiData = store.state.kiemTra.Exam.find(o => o.classID == id);
        const tuLuyenData = store.state.LuyenTap.TuLuyen.find(o => o.id == id);

        // console.log("----------------------")
        if (luyenTapData) {
            siso = luyenTapData.siSo;
            
            if (luyenTapData.studentIDs){
                if(luyenTapData.studentIDs.length > 0){
                    tghd += luyenTapData.times/luyenTapData.studentIDs.length;
                    dataStudens = dataStudens.concat([], luyenTapData.studentIDs)
                }
            }
                
            // console.log(luyenTapData.studentIDs)
        }
        if (linkData) {
            if (linkData.studentIDs && linkData.studentIDs.length > 0){
                tghd += linkData.times/linkData.studentIDs.length;
                dataStudens = dataStudens.concat([], linkData.studentIDs)
            }
                
            // console.log(linkData.studentIDs)
        }
        if (kiemTraData) {
           
            if (kiemTraData.studentIDs && kiemTraData.studentIDs.length > 0){
                tghd += kiemTraData.times/kiemTraData.studentIDs.length;
                dataStudens = dataStudens.concat([], kiemTraData.studentIDs)
            }
                
            // console.log(kiemTraData.studentIDs)
        }
        if (khaoThiData) {
            
            if (khaoThiData.studentIDs && khaoThiData.studentIDs.length > 0)
            {
            tghd += khaoThiData.times;  
            dataStudens = dataStudens.concat([], khaoThiData.studentIDs)
            }
            // console.log(khaoThiData.studentIDs)
        }
        if (tuLuyenData) {
            
            if (tuLuyenData.hstg && tuLuyenData.hstg.length > 0){
                tghd += tuLuyenData.tgtl/tuLuyenData.hstg.length;
                dataStudens = dataStudens.concat([], tuLuyenData.hstg)
            }
                
            // console.log(tuLuyenData.hstg)
        }


        var studentActive = Array.from(new Set(dataStudens)).filter(o => o != null && o.length > 10);
        
        // console.log(studentActive)
        // console.log("----------------------")
        if (studentActive.length > 0) {
            const dataStudentActive: number = ((studentActive.length / siso) * 100);
            if (dataStudentActive == Infinity) {
                //this.totalData.TongHop.HSHD.push(studentActive.length);
                //this.totalData.TongHop.TyLe.push(0);
                return [
                    {
                        text: siso,
                        style: 'text-align: center'
                    },
                    {
                        text: studentActive.length,
                        style: 'text-align: center'
                    },
                    {
                        text: '',
                        style: 'text-align: center'
                    },
                    {
                        text: tghd.toFixed(1),
                        style: 'border-right: 1px solid #000000;text-align: center'
                    }
                ];
            }
            else {
                //this.totalData.TongHop.TyLe.push(dataStudentActive)
                return [
                    {
                        text: siso,
                        style: 'text-align: center'
                    },
                    {
                        text: studentActive.length,
                        style: 'text-align: center'
                    },
                    {
                        text: dataStudentActive.toFixed(1) + "%",
                        style: 'text-align: center'
                    },
                    {
                        text: tghd.toFixed(1),
                        style: 'border-right: 1px solid #000000;text-align: center'
                    }
                ];
            }
        }
        return siso == 0 ?
            [
                {
                    text: "---",
                    style: 'text-align: center'
                },
                {
                    text: "---",
                    style: 'text-align: center'
                },
                {
                    text: "---",
                    style: 'text-align: center'
                },
                {
                    text: "---",
                    style: 'border-right: 1px solid #000000; text-align: center;'
                }
            ]

            :
            [
                {
                    text: siso,
                    style: 'text-align: center'
                },
                {
                    text: "---",
                    style: 'text-align: center'
                },
                {
                    text: "---",
                    style: 'text-align: center'
                },
                {
                    text: tghd > 0 ? tghd.toFixed(1) : '---',
                    style: 'border-right: 1px solid #000000; text-align: center'
                }
            ]
    }
    public getLink(id: string) {
        if (store.state.Type == 2) {
            const dataClass = store.state.LuyenTap.Link.find(o => o.classID == store.state.FilterClass);
            if (dataClass && dataClass.details && dataClass.details.length > 0) {
                var dataStudent = dataClass.details.find(o => o.id == id);
                if (dataStudent) {
                    if (dataStudent.tyLeThamGia > 0) {
                        return [
                            {
                                text: dataStudent.tyLeThamGia.toFixed(0) + "/" + dataClass.totalLesson,
                                style: 'text-align: center'
                            },
                            {
                                text: dataStudent.thoiGian.toFixed(1),
                                style: 'border-right: 1px solid #000000; text-align: center'
                            }
                        ];
                    }
                }
            }
            return [
                {
                    text: "---",
                    style: 'text-align: center'
                },
                {
                    text: "---",
                    style: 'border-right: 1px solid #000000; text-align: center'
                }
            ];

        }

        const linkData = store.state.LuyenTap.Link.find(o => o.classID == id);

        if (linkData && linkData.studentIDs && linkData.studentIDs.length > 0) {
            return [{
                text: (linkData.studentIDs.length * 100 / linkData.siSo).toFixed(1) + "%",
                style: 'text-align: center'
            },
            {
                text: (linkData.times/linkData.studentIDs.length).toFixed(1),
                style: 'border-right: 1px solid #000000; text-align: center'
            }];
        }

        return [{
            text: "---",
            style: 'text-align: center'
        },
        {
            text: "---",
            style: 'border-right: 1px solid #000000; text-align: center'
        }];
    }
    public getLuyenTap(id: string) {
        if (store.state.Type == 2) {
            const dataClass = store.state.LuyenTap.Class.find(o => o.classID == store.state.FilterClass);
            if (dataClass && dataClass.details && dataClass.details.length > 0) {
                var dataStudent = dataClass.details.find(o => o.id == id);
                if (dataStudent) {
                    if (dataStudent.tyLeThamGia > 0) {
                        return [{
                            text: dataStudent.tyLeThamGia.toFixed(0) + "/" + dataClass.totalLesson,
                            style: 'text-align: center'
                        },
                        {
                            text: dataStudent.thoiGian.toFixed(1),
                            style: 'border-right: 1px solid #000000; text-align: center'
                        }];
                    }
                }
                else {
                    return [{
                        text: "0/" + dataClass.totalLesson,
                        style: 'text-align: center'
                    },
                    {
                        text: '---',
                        style: 'border-right: 1px solid #000000; text-align: center'
                    }];
                }
            }
            return [{
                text: "---",
                style: 'text-align: center'
            },
            {
                text: "---",
                style: 'border-right: 1px solid #000000; text-align: center'
            }];
        }
        const linkData = store.state.LuyenTap.Class.find(o => o.classID == id);
        if (linkData && linkData.studentIDs && linkData.studentIDs.length > 0) {
            return [{
                text: linkData.tyleThamGia.toFixed(1) + "%",
                style: 'text-align: center'
            },
            {
                text:  (linkData.times/linkData.studentIDs.length).toFixed(1),
                style: 'border-right: 1px solid #000000; text-align: center'
            }];
        }

        return [{
            text: "---",
            style: 'text-align: center'
        },
        {
            text: "---",
            style: 'border-right: 1px solid #000000; text-align: center'
        }];
    }
    public getKiemTra(id: string) {
        if (store.state.Type == 2) {
            const dataClass = store.state.kiemTra.Class.find(o => o.classID == store.state.FilterClass);
            if (dataClass && dataClass.details && dataClass.details.length > 0) {
                var dataStudent = dataClass.details.find(o => o.id == id);
                if (dataStudent) {
                    if (dataStudent.tyLeThamGia > 0) {
                        return [
                            {
                                text: dataStudent.diem.toFixed(1),
                                style: 'text-align: center'
                            },
                            {
                                text: dataStudent.thoiGian.toFixed(1),
                                style: 'border-right: 1px solid #000000; text-align: center'
                            }];
                    }
                }
                else {
                    return [{
                        text: "0/" + dataClass.totalLesson,
                        style: 'text-align: center'
                    },
                    {
                        text: '---',
                        style: 'border-right: 1px solid #000000; text-align: center'
                    }];
                }
            }
            return [{
                text: "---",
                style: 'text-align: center'
            },
            {
                text: "---",
                style: 'border-right: 1px solid #000000; text-align: center'
            }];
        }
        const linkData = store.state.kiemTra.Class.find(o => o.classID == id);
        if (linkData && linkData.studentIDs && linkData.studentIDs.length > 0) {
            return [{
                text: linkData.tyleThamGia.toFixed(1) + "%",
                style: 'text-align: center'
            },
            {
                text: linkData.points.toFixed(1),
                style: 'text-align: center'
            },
            {
                text: (linkData.times/linkData.studentIDs.length).toFixed(1),
                style: 'border-right: 1px solid #000000; text-align: center'
            }];
        }
        return [{
            text: "---",
            style: 'text-align: center'
        },
        {
            text: "---",
            style: 'text-align: center'
        },
        {
            text: "---",
            style: 'border-right: 1px solid #000000; text-align: center'
        }];
    }
    public getKhaoThi(id: string) {
        if (store.state.Type == 2) {
            const dataClass = store.state.kiemTra.Exam.find(o => o.classID == store.state.FilterClass);
            if (dataClass && dataClass.details && dataClass.details.length > 0) {
                var dataStudent = dataClass.details.find(o => o.id == id);
                if (dataStudent) {
                    if (dataStudent.tyLeThamGia > 0) {
                        return [
                            {
                                text: dataStudent.diem.toFixed(1),
                                style: 'text-align: center'
                            },
                            {
                                text: dataStudent.thoiGian.toFixed(1),
                                style: 'border-right: 1px solid #000000; text-align: center'
                            }];
                    }
                }
            }
            return [{
                text: "---",
                style: 'text-align: center'
            },
            {
                text: "---",
                style: 'border-right: 1px solid #000000; text-align: center'
            }];
        }
        const linkData = store.state.kiemTra.Exam.find(o => o.classID == id);
        if (linkData && linkData.studentIDs && linkData.studentIDs.length > 0) {
            return [{
                text: (linkData.studentIDs.length*100/linkData.siSo).toFixed(1) + "%",
                style: 'text-align: center'
            },
            {
                text: linkData.points.toFixed(1),
                style: 'text-align: center'
            },
            {
                ///linkData.studentIDs.length
                text: (linkData.times).toFixed(1),
                style: 'border-right: 1px solid #000000; text-align: center'
            }];
        }
        return [{
            text: "---",
            style: 'text-align: center'
        },
        {
            text: "---",
            style: 'text-align: center'
        },
        {
            text: "---",
            style: 'border-right: 1px solid #000000; text-align: center'
        }];
    }
    public getTuLuyen(id: string) {
        if (store.state.Type == 2) {
            const dataClass = store.state.LuyenTap.TuLuyen.find(o => o.id == store.state.FilterClass);
            if (dataClass && dataClass.ds && dataClass.ds.length > 0) {
                var dataStudent = dataClass.ds.find(o => o.id == id);
                if (dataStudent) {
                    if (dataStudent.questionTotal > 0) {
                        return [{
                            text: dataStudent.questionTotal.toFixed(0),
                            style: 'text-align: center'
                        },
                        {
                            text: dataStudent.timeTotal.toFixed(1),
                            style: 'border-right: 1px solid #000000; text-align: center'
                        }];
                    }
                }
            }
            return [{
                text: "---",
                style: 'text-align: center'
            },
            {
                text: "---",
                style: 'border-right: 1px solid #000000; text-align: center'
            }];
        }
        const linkData = store.state.LuyenTap.TuLuyen.find(o => o.id == id);
        if (linkData && linkData.hstg && linkData.hstg.length > 0 && linkData.qtt > 0) {
            return [{
                text: ((linkData.hstg.length / linkData.siso) * 100).toFixed(1) + "%",
                style: 'text-align: center'
            },
            {
                text: (linkData.tgtl/linkData.hstg.length).toFixed(1),
                style: 'border-right: 1px solid #000000; text-align: center'
            }];
        }
        return [{
            text: "---",
            style: 'text-align: center'
        },
        {
            text: "---",
            style: 'border-right: 1px solid #000000; text-align: center'
        }];
    }
    public getTongKet(){
        if(store.state.Type == 2){
            let tghd = 0;
            const linkData = store.state.LuyenTap.Link.find(o => o.classID == store.state.FilterClass);
            const luyenTapData = store.state.LuyenTap.Class.find(o => o.classID == store.state.FilterClass);
            const kiemTraData = store.state.kiemTra.Class.find(o => o.classID == store.state.FilterClass);
            const khaoThiData = store.state.kiemTra.Exam.find(o => o.classID == store.state.FilterClass);
            const tuLuyenData = store.state.LuyenTap.TuLuyen.find(o => o.id == store.state.FilterClass);

            if(linkData && linkData.studentIDs && linkData.studentIDs.length > 0){
                tghd += linkData.times/linkData.studentIDs.length;
            }
            if(luyenTapData && luyenTapData.studentIDs && luyenTapData.studentIDs.length > 0){
                tghd += luyenTapData.times;
            }
            if(kiemTraData && kiemTraData.studentIDs && kiemTraData.studentIDs.length > 0){
                tghd += kiemTraData.times;
            }
            if(khaoThiData && khaoThiData.studentIDs && khaoThiData.studentIDs.length > 0){
                tghd += khaoThiData.times;
            }
            if(tuLuyenData && tuLuyenData.ds && tuLuyenData.ds.length > 0){
                tghd += tuLuyenData.tgtl;
            }

            return this.createViewTongKet_Student(tghd,linkData, luyenTapData, tuLuyenData, kiemTraData, khaoThiData)
        }

        else{

            let luyentapLink      = Array.from(store.state.LuyenTap.Link);
            let luyentapClass     = Array.from(store.state.LuyenTap.Class);
            let luyentapTuLuyen   = Array.from(store.state.LuyenTap.TuLuyen);
            let kiemTraClass      = Array.from(store.state.kiemTra.Class);
            let kiemTraExam       = Array.from(store.state.kiemTra.Exam);

            if(store.state.Type == 1){
                if(store.state.TeacherView && store.state.TeacherView.id.length > 10){
                    luyentapLink    = luyentapLink   .filter(o=> store.state.TeacherView.classIDs.includes(o.classID))
                    luyentapClass   = luyentapClass  .filter(o=> store.state.TeacherView.classIDs.includes(o.classID))
                    luyentapTuLuyen = luyentapTuLuyen.filter(o=> store.state.TeacherView.classIDs.includes(o.id))
                    kiemTraClass    = kiemTraClass   .filter(o=> store.state.TeacherView.classIDs.includes(o.classID))
                    kiemTraExam     = kiemTraExam    .filter(o=> store.state.TeacherView.classIDs.includes(o.classID))
                }
                if(store.state.FilterLevel){
                    const listClass = Array.from(store.state.Class).filter(o=>o.level == store.state.FilterLevel);
                    if(listClass && listClass.length > 0){
                        luyentapLink    = luyentapLink   .filter(o=> listClass.map(x=>x.id).includes(o.classID))
                        luyentapClass   = luyentapClass  .filter(o=> listClass.map(x=>x.id).includes(o.classID))
                        luyentapTuLuyen = luyentapTuLuyen.filter(o=> listClass.map(x=>x.id).includes(o.id))
                        kiemTraClass    = kiemTraClass   .filter(o=> listClass.map(x=>x.id).includes(o.classID))
                        kiemTraExam     = kiemTraExam    .filter(o=> listClass.map(x=>x.id).includes(o.classID))
                    }
                    else{
                        luyentapLink    = [];
                        luyentapClass   = [];
                        luyentapTuLuyen = [];
                        kiemTraClass    = [];
                        kiemTraExam     = [];
                    }
                }
            }

            const dataStudentLink = luyentapLink.map(o=>o.studentIDs);
            const dataStudentClass = luyentapClass.map(o=>o.studentIDs);
            const dataStudentTuLuyen = luyentapTuLuyen.map(o=>o.hstg);
            const dataStudentKiemTra = kiemTraClass.map(o=>o.studentIDs);
            const dataStudentKhaoThi = kiemTraExam.map(o=>o.studentIDs);

            
            const pointDataTimeKiemTra   = kiemTraClass.map(o=>o.points).filter(o=>o > 0) 
            const pointDataTimeKhaoThi   = kiemTraExam.map(o=>o.points).filter(o=>o > 0)

            
            const trueDataTimeLink      = luyentapLink.map(o=>o.times).filter(o=>o > 0)  
            const trueDataTimeClass     = luyentapClass.map(o=>o.times).filter(o=>o > 0) 
            const trueDataTimeTuLuyen   = luyentapTuLuyen.map(o=>o.tgtl).filter(o=>o > 0)
            const trueDataTimeKiemTra   = kiemTraClass.map(o=>o.times).filter(o=>o > 0)  
            const trueDataTimeKhaoThi   = kiemTraExam.map(o=>o.times*o.tyleThamGia*o.siSo/100).filter(o=>o > 0)   

            const totalDataTimeLink      = luyentapLink.map(o=>(o.tyleThamGia*o.siSo/100)).reduce((a,b)=>a+b,0)
            const totalDataTimeClass     = luyentapClass.map(o=>(o.tyleThamGia*o.siSo/100)).reduce((a,b)=>a+b,0)
            const totalDataTimeTuLuyen   = luyentapTuLuyen.map(o=>(o.tltg)).reduce((a,b)=>a+b,0)
            const totalDataTimeKiemTra   = kiemTraClass.map(o=>(o.tyleThamGia*o.siSo/100)).reduce((a,b)=>a+b,0)
            const totalDataTimeKhaoThi   = kiemTraExam.map(o=>(o.tyleThamGia*o.siSo/100)).reduce((a,b)=>a+b,0)

            const listStudentActiveLink = this.mergeArray(dataStudentLink,0);
            const listStudentActiveClass = this.mergeArray(dataStudentClass,0);
            const listStudentActiveKhaoThi = this.mergeArray(dataStudentKhaoThi,0);
            const listStudentActiveKiemTra = this.mergeArray(dataStudentKiemTra,0);
            const listStudentActiveTuLuyen = this.mergeArray(dataStudentTuLuyen,0);


            const dataTimeLink      = trueDataTimeLink   .reduce((a,b)=>(a+b),0);
            const dataTimeClass     = trueDataTimeClass  .reduce((a,b)=>(a+b),0);
            const dataTimeTuLuyen   = trueDataTimeTuLuyen.reduce((a,b)=>(a+b),0);
            const dataTimeKiemTra   = trueDataTimeKiemTra.reduce((a,b)=>(a+b),0);
            const dataTimeKhaoThi   = trueDataTimeKhaoThi.reduce((a,b)=>(a+b),0);

            const timeLink      = dataTimeLink > 0 ? (dataTimeLink/       totalDataTimeLink) : 0;
            const timeClass     = dataTimeClass > 0 ? (dataTimeClass/     totalDataTimeClass) : 0;
            const timeTuLuyen   = dataTimeTuLuyen > 0 ? (dataTimeTuLuyen/ totalDataTimeTuLuyen) : 0;
            const timeKiemTra   = dataTimeKiemTra > 0 ? (dataTimeKiemTra/ totalDataTimeKiemTra) : 0;
            const timeKhaoThi   = dataTimeKhaoThi > 0 ? (dataTimeKhaoThi/ totalDataTimeKhaoThi) : 0;
            
            const dataTimes = [timeLink,timeClass,timeTuLuyen,timeKiemTra,timeKhaoThi].reduce((a,b)=>a+b,0);

            // console.log(dataTimes);
            

            const listStudents = dataStudentLink.concat(dataStudentClass,dataStudentTuLuyen,dataStudentKiemTra,dataStudentKhaoThi).filter(o=> o && o.length > 0);
            const dataActive = this.mergeArray<string[]>(listStudents,0);
            const siso = luyentapLink.map(o=>o.siSo).reduce((a,b)=>(a+b),0);

            const students = Array.from(new Set(dataActive)).filter(o => o != null && o.length > 10)

            const studentActive = dataActive && dataActive.length > 0 ? students.length : 0;
            const studentTimes = dataTimes > 0 ? dataTimes.toFixed(1) : "---";

            ///công thức tính thời gian trung bình bằng :
            /// a  = tổng số học sinh hoạt động : 
            /// b  = tổng thời gian * học sinh hoạt động
            /// c  = b/a =>  thời gian trung bình của khu vực / cơ sở

            return this.createViewTongKet(
                siso,
                studentActive,
                studentTimes,
                listStudentActiveLink,
                timeLink,
                listStudentActiveClass,
                timeClass,
                listStudentActiveTuLuyen,
                timeTuLuyen,
                listStudentActiveKiemTra,
                timeKiemTra,
                pointDataTimeKiemTra,
                listStudentActiveKhaoThi,
                timeKhaoThi,
                pointDataTimeKhaoThi
            );
        }
    }

    createViewTongKet_Student(tghd:number,linkData:typeExam|undefined, luyenTapData:typeExam|undefined, tuLuyenData:typeTuLuyen|undefined, kiemTraData:typeExam|undefined, khaoThiData:typeExam|undefined){    
        if(store.state.View == 3){
            return [
                // tổng hợp
                {
                    text: tghd > 0 ? tghd.toFixed(1) :"---",
                    style: 'text-align: center; border-right:1px solid #000'
                },
                // bai link
                {
                    text: linkData != null && linkData.studentIDs && linkData.studentIDs.length >0 ? ((linkData.studentIDs.length/linkData.siSo)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text:linkData != null && linkData.studentIDs && linkData.studentIDs.length >0 ? (linkData.times/linkData.studentIDs.length).toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                // luyện tập lớp
                {
                    text:luyenTapData != null && luyenTapData.studentIDs && luyenTapData.studentIDs.length >0 ? ((luyenTapData.studentIDs.length/luyenTapData.siSo)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text:luyenTapData != null && luyenTapData.studentIDs && luyenTapData.studentIDs.length >0 ? (luyenTapData.times/luyenTapData.studentIDs.length).toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                //tu luyen
                {
                    text: tuLuyenData != null && tuLuyenData.tltg > 0 ? (tuLuyenData.tltg).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text:tuLuyenData != null && tuLuyenData.tgtl >0 ? tuLuyenData.tgtl.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                // bai kiểm tra
                {
                    text: kiemTraData != null && kiemTraData.studentIDs && kiemTraData.studentIDs.length >0 ? kiemTraData.points.toFixed(1) : "---",
                    style: 'text-align: center'
                },
                {
                    text:kiemTraData != null && kiemTraData.studentIDs && kiemTraData.studentIDs.length >0 ? (kiemTraData.times/kiemTraData.studentIDs.length).toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                // bai khao thi
                {
                    text: khaoThiData != null && khaoThiData.studentIDs && khaoThiData.studentIDs.length > 0 ? khaoThiData.points.toFixed(1) : "---",
                    style: 'text-align: center'
                },
                {
                    text:khaoThiData != null && khaoThiData.studentIDs && khaoThiData.studentIDs.length >0 ? khaoThiData.times.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                }
            ];
        }
        if(store.state.View == 2){
            return [
                // bai kiểm tra
                {
                    text: kiemTraData != null && kiemTraData.studentIDs && kiemTraData.studentIDs.length >0 ? kiemTraData.points.toFixed(1) : "---",
                    style: 'text-align: center'
                },
                {
                    text:kiemTraData != null && kiemTraData.studentIDs && kiemTraData.studentIDs.length >0 ? (kiemTraData.times/kiemTraData.studentIDs.length).toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                // bai khao thi
                {
                    text: khaoThiData != null && khaoThiData.studentIDs && khaoThiData.studentIDs.length > 0 ? khaoThiData.points.toFixed(1) : "---",
                    style: 'text-align: center'
                },
                {
                    text:khaoThiData != null && khaoThiData.studentIDs && khaoThiData.studentIDs.length >0 ? khaoThiData.times.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                }
            ];
        }
        if(store.state.View == 1){
            return [
                // bai link
                {
                    text: linkData != null && linkData.studentIDs && linkData.studentIDs.length >0 ? ((linkData.studentIDs.length/linkData.siSo)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text:linkData != null && linkData.studentIDs && linkData.studentIDs.length >0 ? (linkData.times/linkData.studentIDs.length).toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                // luyện tập lớp
                {
                    text:luyenTapData != null && luyenTapData.studentIDs && luyenTapData.studentIDs.length >0 ? ((luyenTapData.studentIDs.length/luyenTapData.siSo)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text:luyenTapData != null && luyenTapData.studentIDs && luyenTapData.studentIDs.length >0 ? (luyenTapData.times/luyenTapData.studentIDs.length).toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                //tu luyen
                {
                    text: tuLuyenData != null && tuLuyenData.ds && tuLuyenData.ds.length >0 ? ((tuLuyenData.ds.length/tuLuyenData.siso)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text:tuLuyenData != null && tuLuyenData.ds && tuLuyenData.ds.length >0 ? tuLuyenData.tgtl.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                }
            ];
        }
        if(store.state.View == 0){
            return [
                // tổng hợp
                {
                    text: tghd > 0 ? tghd.toFixed(1) :"---",
                    style: 'text-align: center; border-right:1px solid #000'
                },
            ];
        }
    }

    createViewTongKet(
        siso:number,
        studentActive:number,
        studentTimes:string,
        listStudentActiveLink:string[][],
        timeLink:number,
        listStudentActiveClass:string[][],
        timeClass:number,
        listStudentActiveTuLuyen:string[][],
        timeTuLuyen:number,
        listStudentActiveKiemTra:string[][],
        timeKiemTra:number,
        pointDataTimeKiemTra:number[],
        listStudentActiveKhaoThi:string[][],
        timeKhaoThi:number,
        pointDataTimeKhaoThi:number[]
        ){

            // //tong hop
             const Siso = siso;
             const StudentActive = studentActive;
             const StudentActivePercent = Siso > 0 && studentActive > 0 ? (StudentActive/siso)*100 : 0;
            // const StudentTotalTime = studentTimes;
            // // link
             const studentActiveLink = listStudentActiveLink.length;
             const studentActiveLinkPercent = studentActiveLink > 0 ? (studentActive/siso)*100 : 0;
            // const studentTimeLink = timeLink;
            // //luyen tap
            // const studentActiveLuyenTap = listStudentActiveClass.length;
            // const studentActiveLuyenTapPercent = studentActiveLuyenTap > 0 ? (studentActiveLuyenTap/siso)*100 :0
            // const studenTimeLuyenTap = timeClass;
            // // tu luyen
            // const studentActiveTuLuyen = listStudentActiveTuLuyen.length;
            // const studentTuLuyenPercent = studentActiveTuLuyen > 0 ? (studentActiveLuyenTap/siso)*100 : 0;
            // const studentTimeTuLuyen = timeTuLuyen;
            // //kiem tra
            // const studentActiveKiemTra = listStudentActiveKiemTra.length;
            // const studentActiveKiemTraPercent = studentActiveKiemTra > 0 ? (studentActiveKiemTra/siso)*100 : 0
            // const studentPointKiemTra = pointDataTimeKiemTra && pointDataTimeKiemTra.length > 0 ? (pointDataTimeKiemTra.reduce((a,b)=>a+b,0)/pointDataTimeKiemTra.length) : 0;
            // const studentTimeKiemTra = timeKiemTra
            // //khao thi
            // const studentActiveKhaoThi = listStudentActiveKhaoThi.length;
            // const studentActiveKhaoThiPercent = studentActiveKhaoThi > 0 ? (studentActiveKhaoThi/siso)*100 : 0
            // const studentPointKhaoThi = pointDataTimeKhaoThi && pointDataTimeKhaoThi.length > 0 ? (pointDataTimeKhaoThi.reduce((a,b)=>a+b,0)/pointDataTimeKhaoThi.length) : 0;
            // const studentTimeKhaoThi = timeKhaoThi



        if(store.state.View == 3){
            /**
             * tất cả
             */
             return [
                // tổng hợp
                {
                    text: siso == 0 ? "---" : siso,
                    style: 'text-align: center'
                },
                {
                    text: studentActive == 0 ? "---" : studentActive,
                    style: 'text-align: center'
                },
                {
                    text: studentActive == 0 ? "---" : StudentActivePercent.toFixed(1)+"%",
                    style: 'text-align: center'
                },
                {
                    text:studentTimes,
                    style: 'text-align: center; border-right:1px solid #000'
                },
                // bai link
                {
                    text: listStudentActiveLink != null && listStudentActiveLink.length >0 ? studentActiveLinkPercent.toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text:timeLink > 0 ? timeLink.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                // luyện tập lớp
                {
                    text:listStudentActiveClass != null && listStudentActiveClass.length >0 ? ((listStudentActiveClass.length/siso)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text:timeClass > 0 ? timeClass.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                //tu luyen
                {
                    text: listStudentActiveTuLuyen != null && listStudentActiveTuLuyen.length >0 ? ((listStudentActiveTuLuyen.length/siso)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text:timeTuLuyen > 0 ? timeTuLuyen.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                // bai kiểm tra
                {
                    text: listStudentActiveKiemTra != null && listStudentActiveKiemTra.length >0 ? ((listStudentActiveKiemTra.length/siso)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text: pointDataTimeKiemTra && pointDataTimeKiemTra.length > 0 ? (pointDataTimeKiemTra.reduce((a,b)=>a+b,0)/pointDataTimeKiemTra.length).toFixed(1) : "---",
                    style: 'text-align: center'
                },
                {
                    text:timeKiemTra > 0 ? timeKiemTra.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                // bai khao thi
                {
                    text: listStudentActiveKhaoThi != null && listStudentActiveKhaoThi.length >0 ? ((listStudentActiveKhaoThi.length/siso)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text: pointDataTimeKhaoThi && pointDataTimeKhaoThi.length > 0 ? (pointDataTimeKhaoThi.reduce((a,b)=>a+b,0)/pointDataTimeKhaoThi.length).toFixed(1) : "---",
                    style: 'text-align: center'
                },
                {
                    text:timeKhaoThi > 0 ? timeKhaoThi.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                }
            ]
        }
        if(store.state.View == 1){
            /**
             * luyện tập
             */
             return [
                // bai link
                {
                    text: listStudentActiveLink != null && listStudentActiveLink.length >0 ? ((listStudentActiveLink.length/siso)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text:timeLink > 0 ? timeLink.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                // luyện tập lớp
                {
                    text:listStudentActiveClass != null && listStudentActiveClass.length >0 ? ((listStudentActiveClass.length/siso)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text:timeClass > 0 ? timeClass.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                //tu luyen
                {
                    text: listStudentActiveTuLuyen != null && listStudentActiveTuLuyen.length >0 ? ((listStudentActiveTuLuyen.length/siso)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text:timeTuLuyen > 0 ? timeTuLuyen.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                }
                
            ]
        }
        if(store.state.View == 2){
            /**
             * kiểm tra
             */
             return [
                // bai kiểm tra
                {
                    text: listStudentActiveKiemTra != null && listStudentActiveKiemTra.length >0 ? ((listStudentActiveKiemTra.length/siso)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text: pointDataTimeKiemTra && pointDataTimeKiemTra.length > 0 ? (pointDataTimeKiemTra.reduce((a,b)=>a+b,0)/pointDataTimeKiemTra.length).toFixed(1) : "---",
                    style: 'text-align: center'
                },
                {
                    text:timeKiemTra > 0 ? timeKiemTra.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                // bai khao thi
                {
                    text: listStudentActiveKhaoThi != null && listStudentActiveKhaoThi.length >0 ? ((listStudentActiveKhaoThi.length/siso)*100).toFixed(1)+"%" : "---",
                    style: 'text-align: center'
                },
                {
                    text: pointDataTimeKhaoThi && pointDataTimeKhaoThi.length > 0 ? (pointDataTimeKhaoThi.reduce((a,b)=>a+b,0)/pointDataTimeKhaoThi.length).toFixed(1) : "---",
                    style: 'text-align: center'
                },
                {
                    text:timeKhaoThi > 0 ? timeKhaoThi.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                }
            ]
        }
        if(store.state.View == 0){
            /**
             * tổng hợp
             */
             return [
                // tổng hợp
                {
                    text: siso == 0 ? "---" : siso,
                    style: 'text-align: center'
                },
                {
                    text: studentActive == 0 ? "---" : studentActive,
                    style: 'text-align: center'
                },
                {
                    text: studentActive == 0 ? "---" : StudentActivePercent.toFixed(1)+"%",
                    style: 'text-align: center'
                },
                {
                    text:studentTimes,
                    style: 'text-align: center; border-right:1px solid #000'
                }
            ]
        }
    }


    mergeArray<T>(dataMerge:(T|null)[],isLog:number){
        let data:T[] = [];
        if(isLog){
            console.log(dataMerge);
        }
        if(dataMerge && dataMerge.length > 0){
            dataMerge.forEach(o=>{
                if(o){
                    // console.log(o,o instanceof Array);
                    if(o instanceof Array && o.length > 0){
                        data = data.concat(o);
                    }
                    if(o && typeof(o) == typeof(1)){
                        // console.log(o)
                        data.push(o);
                    }
                }
            })
        }
        // console.log(data);
        return data;
    }
}

</script>

<style lang="scss">
.table-report-table {
    border-collapse: separate;
    border-spacing: 0;
    th
    {
        text-align: center;
        vertical-align: middle;
    }
}
@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
.loading {
    display: block;
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
    width: 90%;
    height: 20px;
}
</style>