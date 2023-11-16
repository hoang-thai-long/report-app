
<template>
    <div class="table-data">
        <div class="table-data-box">
            {{ $store.state.Type }}
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th rowspan="3">STT</th>
                        <th style="border-right: 1px solid;" rowspan="3">Tên</th>
                        <!-- tổng hợp -->
                        <template v-if="$store.state.View == 0 || $store.state.View == 3">
                            <th style="border:1px solid;" :colspan="$store.state.Type == 2 ? '1' : '3'">Tổng hợp</th>
                        </template>
                        <!--  luyện tập -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <th style="border:1px solid;" colspan="6">Luyện tập</th>
                        </template>
                        <!-- kiểm tra -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <th style="border:1px solid;" colspan="6">Kiểm tra</th>
                        </template>
                    </tr>
                    <tr>
                        <!-- tổng hợp -->
                        <template v-if="$store.state.View == 0 || $store.state.View == 3">
                            <template v-if="$store.state.Type == 2">
                                <th style="border-right: 1px solid;" rowspan="2">Thời gian</th>
                            </template>
                            <template v-else>
                                <th style="border-left: 1px solid;" rowspan="2">Sĩ số</th>
                                <th rowspan="2">HSHĐ</th>
                                <th style="border-right: 1px solid;" rowspan="2">Thời gian</th>
                            </template>

                        </template>
                        <!--  luyện tập -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <th style="border-right: 1px solid;" colspan="2">Được giao qua link</th>
                            <th style="border-right: 1px solid;" colspan="2">GV giao trong lớp</th>
                            <th style="border-right: 1px solid;" colspan="2">Tự luyện</th>
                        </template>
                        <!-- kiểm tra -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <th style="border-left: 1px solid; border-right: 1px solid;" colspan="3">Bài trong lớp</th>
                            <th style="border-left: 1px solid; border-right: 1px solid;" colspan="3">Bài khảo thí</th>
                        </template>
                    </tr>
                    <tr>
                        <!--  luyện tập -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <th>TLLB (%)</th>
                            <th style="border-right: 1px solid;">TGLB</th>
                            <th>TLLB (%)</th>
                            <th style="border-right: 1px solid;">TGLB</th>
                            <th>Số câu</th>
                            <th style="border-right: 1px solid;">TGLB</th>
                        </template>
                        <!-- kiểm tra -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <th>TLLB (%)</th>
                            <th>Điểm TB</th>
                            <th style="border-right: 1px solid;">TGLB</th>
                            <th>TLLB (%)</th>
                            <th>Điểm TB</th>
                            <th style="border-right: 1px solid;">TGLB</th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in $store.state.FilterTable" :key="i">
                        <td>{{ (i + 1) }}</td>
                        <td style="border-right: 1px solid; text-align: left;">{{ item.name }}</td>
                        <!-- tổng hợp -->
                        <template v-if="$store.state.View == 0 || $store.state.View == 3">
                            <td v-for="(td, k) in getTongHop(item.id)" :key="'total' + k">{{ td }}</td>
                        </template>

                        <!-- link -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <td v-for="(td, k) in getLink(item.id)" :key="'link' + k">{{ td }}</td>
                        </template>
                        <!--  luyện tập -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <td v-for="(td, k) in getLuyenTap(item.id)" :key="'lt' + k">{{ td }}</td>
                        </template>

                        <!--tự luyện -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <td v-for="(td, k) in getTuLuyen(item.id)" :key="'tl' + k">{{ td }}</td>
                        </template>

                        <!-- kiểm tra -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <td v-for="(td, k) in getKiemTra(item.id)" :key="'bg' + k">{{ td }}</td>
                        </template>

                        <!-- khao thi -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <td v-for="(td, k) in getKhaoThi(item.id)" :key="'kt' + k">{{ td }}</td>
                        </template>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts">
// import store from '@/store';
// import { computed, watch } from 'vue';
import store from '@/store';
import { onlyUnique } from '@/utils/common';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
    @Prop()
    type !: number;


    public getListClass(id: string) {
        let data: { regionID: string, id: string, centerID: string }[] = [];
        switch (store.state.Type) {
            case 1:
                // lay 1 lopws
                data = [{ id: id, regionID: "", centerID: "" }];
                break;
            case 0: // center
                data = store.state.DataClass.filter((o: { regionID: string, id: string, centerID: string }) => o.centerID == id);
                break;
            default:
                data = store.state.DataClass.filter((o: { regionID: string, id: string, centerID: string }) => o.regionID == id);
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
            if (tuLuyenData && tuLuyenData.details && tuLuyenData.details.length > 0) {
                var dataStudentTuLuyen = tuLuyenData.details.find((o: { diem: number, id: string, tyLeThamGia: number, thoiGian: number }) => o.id == id);
                if (dataStudentTuLuyen) {
                    if (dataStudentTuLuyen.tyLeThamGia > 0) {
                        tghd.push(dataStudentTuLuyen.thoiGian)
                    }
                }
            }
            if (tghd && tghd.length > 0) {
                return [tghd.reduce((a, b) => a + b, 0).toFixed(1)];
            }
            return ['---'];
        }
        let data = this.getListClass(id);
        if (data != null && data.length > 0) {
            const listIds = data.map(o => o.id);
            const count = listIds.length;
            let dataStudens: string[] = [];
            let tghd: number[] = [];
            let siso = 0;
            for (let i = 0; i < count; i++) {
                const classid = listIds[i];
                const linkData = store.state.LuyenTap.Link.find(o => o.classID == classid);
                const luyenTapData = store.state.LuyenTap.Class.find(o => o.classID == classid);
                const kiemTraData = store.state.kiemTra.Class.find(o => o.classID == classid);
                const khaoThiData = store.state.kiemTra.Exam.find(o => o.classID == classid);
                const tuLuyenData = store.state.LuyenTap.TuLuyen.find(o => o.id == classid);

                if (luyenTapData) {
                    siso += luyenTapData.siSo;
                    if (luyenTapData.details && luyenTapData.details.length > 0) {
                        const studentActive = luyenTapData.details.filter((o: { thoiGian: number, id: string }) => o.thoiGian > 0);
                        if (studentActive && studentActive.length > 0) {
                            dataStudens = dataStudens.concat(studentActive.map((o: { thoiGian: number, id: string }) => o.id))
                            tghd = tghd.concat(studentActive.map((o: { thoiGian: number, id: string }) => o.thoiGian))
                        }
                    }
                }
                if (linkData) {
                    if (linkData.details && linkData.details.length > 0) {
                        const studentActive = linkData.details.filter((o: { thoiGian: number, id: string }) => o.thoiGian > 0);
                        if (studentActive && studentActive.length > 0) {
                            dataStudens = dataStudens.concat(studentActive.map((o: { thoiGian: number, id: string }) => o.id))
                            tghd = tghd.concat(studentActive.map((o: { thoiGian: number, id: string }) => o.thoiGian))
                        }
                    }
                }
                if (kiemTraData) {
                    if (kiemTraData.details && kiemTraData.details.length > 0) {
                        const studentActive = kiemTraData.details.filter((o: { thoiGian: number, id: string }) => o.thoiGian > 0);
                        if (studentActive && studentActive.length > 0) {
                            dataStudens = dataStudens.concat(studentActive.map((o: { thoiGian: number, id: string }) => o.id))
                            tghd = tghd.concat(studentActive.map((o: { thoiGian: number, id: string }) => o.thoiGian))
                        }
                    }
                }
                if (khaoThiData) {
                    if (khaoThiData.details && khaoThiData.details.length > 0) {
                        const studentActive = khaoThiData.details.filter((o: { thoiGian: number, id: string }) => o.thoiGian > 0);
                        if (studentActive && studentActive.length > 0) {
                            dataStudens = dataStudens.concat(studentActive.map((o: { thoiGian: number, id: string }) => o.id))
                            tghd = tghd.concat(studentActive.map((o: { thoiGian: number, id: string }) => o.thoiGian))
                        }
                    }
                }
                if (tuLuyenData) {
                    if (tuLuyenData.ds && tuLuyenData.ds.length > 0) {
                        const studentActive = tuLuyenData.ds.filter((o: { timeTotal: number, id: string }) => o.timeTotal > 0);
                        if (studentActive && studentActive.length > 0) {
                            dataStudens = dataStudens.concat(studentActive.map((o: { timeTotal: number, id: string }) => o.id))
                            tghd = tghd.concat(studentActive.map((o: { timeTotal: number, id: string }) => o.timeTotal))
                        }
                    }
                }
            }

            const tghdavg = tghd.length == 0 ? 0 : tghd.reduce((a, b) => a + b, 0) / tghd.length;
            if(siso == 0) return ["---", '---','---']; 
            return [siso, dataStudens.filter(onlyUnique).length, Math.round(tghdavg * 100) / 100];
        }

        return ["---", '---','---'];
    }


    public getLink(id: string) {
        if (store.state.Type == 2) {
            const dataClass = store.state.LuyenTap.Link.find(o => o.classID == store.state.FilterClass);
            if (dataClass && dataClass.details && dataClass.details.length > 0) {
                var dataStudent = dataClass.details.find((o: { regionID: string, id: string, centerID: string }) => o.id == id);
                if (dataStudent) {
                    if (dataStudent.tyLeThamGia > 0) {
                        return [dataStudent.tyLeThamGia.toFixed(0), dataStudent.diem.toFixed(0), dataStudent.thoiGian.toFixed(1)]
                    }
                }
            }
            return ['---', '---'];
        }

        let data = this.getListClass(id);
        if (data != null && data.length > 0) {
            const listIds = data.map(o => o.id);
            const count = listIds.length;
            let times: number[] = [];
            let tllb: number[] = [];
            for (let i = 0; i < count; i++) {
                const classid = listIds[i];
                const linkData = store.state.LuyenTap.Link.find(o => o.classID == classid);
                if (linkData) {
                    if (linkData.times > 0 && linkData.siSo > 0) {
                        times.push(linkData.times)
                        tllb.push(linkData.tyleThamGia)
                    }

                }
            }
            const TLTG = tllb.length > 0 ? tllb.reduce((a, b) => a + b) / tllb.length : 0;
            const TGLB = times.length > 0 ? times.reduce((a, b) => a + b) / times.length : 0;
            if(TLTG <= 0) return ['---','---'];
            return [Math.round(TLTG), TGLB.toFixed(1)];
        }

        return ["---", '---'];


        // const item = store.state.LuyenTap.Link.find(o=>o.classID == classid);
        // if(item && Array.isArray(item.details) && item.totalLesson > 0){
        //     const student = item.details.find((x: { id: string; })=>x.id == studentid);
        //     if(student.tyLeThamGia > 0)
        //         return [Math.round((student.tyLeThamGia/100)*item.totalLesson),student.diem.toFixed(1),student.thoiGian.toFixed(1)];
        //     else
        //         return [0,'---','---'];
        // }

        // return [id, store.state.Type, '---'];
    }
    public getLuyenTap(id: string) {
        if (store.state.Type == 2) {
            const dataClass = store.state.LuyenTap.Class.find(o => o.classID == store.state.FilterClass);
            if (dataClass && dataClass.details && dataClass.details.length > 0) {
                var dataStudent = dataClass.details.find((o: { regionID: string, id: string, centerID: string }) => o.id == id);
                if (dataStudent) {
                    if (dataStudent.tyLeThamGia > 0) {
                        return [dataStudent.tyLeThamGia.toFixed(0), dataStudent.thoiGian.toFixed(1)]
                    }
                }
            }
            return ['---', '---'];
        }
        let data = this.getListClass(id);
        if (data != null && data.length > 0) {
            const listIds = data.map(o => o.id);
            const count = listIds.length;
            let times: number[] = [];
            let tllb: number[] = [];
            for (let i = 0; i < count; i++) {
                const classid = listIds[i];
                const linkData = store.state.LuyenTap.Class.find(o => o.classID == classid);
                if (linkData) {
                    if (linkData.times > 0 && linkData.siSo > 0) {
                        times.push(linkData.times)
                        tllb.push(linkData.tyleThamGia)
                    }

                }
            }
            const TLTG = tllb.length > 0 ? tllb.reduce((a, b) => a + b) / tllb.length : 0;
            const TGLB = times.length > 0 ? times.reduce((a, b) => a + b) / times.length : 0;
            if(TLTG <= 0) return ['---','---'];
            return [Math.round(TLTG), TGLB.toFixed(1)];
        }

        // const item = store.state.LuyenTap.Class.find(o=>o.classID == classid);
        // if(item && Array.isArray(item.details) && item.totalLesson > 0){
        //     const student = item.details.find((x: { id: string; })=>x.id == studentid);
        //     return [Math.round((student.tyLeThamGia/100)*item.totalLesson),student.diem.toFixed(1),student.thoiGian.toFixed(1)];
        // }

        return ['---', '---'];
    }
    public getKiemTra(id: string) {
        if (store.state.Type == 2) {
            const dataClass = store.state.kiemTra.Class.find(o => o.classID == store.state.FilterClass);
            if (dataClass && dataClass.details && dataClass.details.length > 0) {
                var dataStudent = dataClass.details.find((o: { regionID: string, id: string, centerID: string }) => o.id == id);
                if (dataStudent) {
                    if (dataStudent.tyLeThamGia > 0) {
                        return [dataStudent.tyLeThamGia.toFixed(0), dataStudent.diem.toFixed(0), dataStudent.thoiGian.toFixed(1)]
                    }
                }
            }
            return ['---', '---', '---'];
        }
        let data = this.getListClass(id);
        if (data != null && data.length > 0) {
            const listIds = data.map(o => o.id);
            const count = listIds.length;
            let points: number[] = [];
            let times: number[] = [];
            let tllb: number[] = [];
            for (let i = 0; i < count; i++) {
                const classid = listIds[i];
                const linkData = store.state.kiemTra.Class.find(o => o.classID == classid);
                if (linkData) {
                    if (linkData.times > 0 && linkData.siSo > 0) {
                        points.push(linkData.points)
                        times.push(linkData.times)
                        tllb.push(linkData.tyleThamGia)
                    }

                }
            }
            const TLTG = tllb.length > 0 ? tllb.reduce((a, b) => a + b) / tllb.length : 0;
            const TGLB = times.length > 0 ? times.reduce((a, b) => a + b) / times.length : 0;
            const DTB = points.length > 0 ? points.reduce((a, b) => a + b) / points.length : 0;

            if(TLTG <= 0) return ['---','---','---'];

            return [Math.round(TLTG), TGLB.toFixed(1), DTB.toFixed(1)];
        }
        // const item = store.state.kiemTra.Class.find(o=>o.classID == classid);
        // if(item && Array.isArray(item.details) && item.totalLesson > 0){
        //     const student = item.details.find((x: { id: string; })=>x.id == studentid);
        //     return [Math.round((student.tyLeThamGia/100)*item.totalLesson),student.diem.toFixed(1),student.thoiGian.toFixed(1)];
        // }

        return ['---', '---', '---'];
    }
    public getKhaoThi(id: string) {
        if (store.state.Type == 2) {
            const dataClass = store.state.kiemTra.Exam.find(o => o.classID == store.state.FilterClass);
            if (dataClass && dataClass.details && dataClass.details.length > 0) {
                var dataStudent = dataClass.details.find((o: { regionID: string, id: string, centerID: string }) => o.id == id);
                if (dataStudent) {
                    if (dataStudent.tyLeThamGia > 0) {
                        return [dataStudent.tyLeThamGia.toFixed(0), dataStudent.diem.toFixed(0), dataStudent.thoiGian.toFixed(1)]
                    }
                }
            }
            return ['---', '---', '---'];
        }
        let data = this.getListClass(id);
        if (data != null && data.length > 0) {
            const listIds = data.map(o => o.id);
            const count = listIds.length;
            let points: number[] = [];
            let times: number[] = [];
            let tllb: number[] = [];
            for (let i = 0; i < count; i++) {
                const classid = listIds[i];
                const linkData = store.state.kiemTra.Exam.find(o => o.classID == classid);
                if (linkData) {
                    if (linkData.times > 0 && linkData.siSo > 0) {
                        points.push(linkData.points)
                        times.push(linkData.times)
                        tllb.push(linkData.tyleThamGia)
                    }

                }
            }
            const TLTG = tllb.length > 0 ? tllb.reduce((a, b) => a + b) / tllb.length : 0;
            const TGLB = times.length > 0 ? times.reduce((a, b) => a + b) / times.length : 0;
            const DTB = points.length > 0 ? points.reduce((a, b) => a + b) / points.length : 0;
            if(TLTG <= 0) return ['---','---','---'];
            return [Math.round(TLTG), TGLB.toFixed(1), DTB.toFixed(1)];
        }
        // const item = store.state.kiemTra.Exam.find(o=>o.classID == classid);
        // if(item && Array.isArray(item.details) && item.totalLesson > 0){
        //     const student = item.details.find((x: { id: string; })=>x.id == studentid);
        //     return [Math.round((student.tyLeThamGia/100)*item.totalLesson),student.diem.toFixed(1),student.thoiGian.toFixed(1)];
        // }

        return ['---', '---', '---'];
    }

    public getTuLuyen(id: string) {
        let data = this.getListClass(id);
        if (store.state.Type == 2) {
            const dataClass = store.state.LuyenTap.TuLuyen.find(o => o.id == store.state.FilterClass);
            if (dataClass && dataClass.ds && dataClass.ds.length > 0) {
                var dataStudent = dataClass.ds.find((o: { regionID: string, id: string, centerID: string }) => o.id == id);
                if (dataStudent) {
                    if (dataStudent.questionTotal > 0) {
                        return [dataStudent.questionTotal.toFixed(0), dataStudent.timeTotal.toFixed(1)]
                    }
                }
            }
            return ['---', '---'];
        }
        if (data != null && data.length > 0) {
            const listIds = data.map(o => o.id);
            const count = listIds.length;
            let times: number[] = [];
            let tllb: number[] = [];
            for (let i = 0; i < count; i++) {
                const classid = listIds[i];
                const linkData = store.state.LuyenTap.TuLuyen.find(o => o.id == classid);
                if (linkData) {
                    if (linkData.times > 0 && linkData.siso > 0) {
                        // points.push(linkData.points)
                        times.push(linkData.tgtl)
                        tllb.push(linkData.tltg)
                    }
                }
            }
            const TLTG = tllb.length > 0 ? tllb.reduce((a, b) => a + b) / tllb.length : 0;
            const TGLB = times.length > 0 ? times.reduce((a, b) => a + b) / times.length : 0;
            if(TLTG <= 0) return ['---','---'];
            // const DTB =  points.length > 0 ? points.reduce((a,b)=>a+b)/points.length : 0;
            return [Math.round(TLTG), TGLB.toFixed(1)];
        }

        return ['---', '---'];
    }

}

</script>