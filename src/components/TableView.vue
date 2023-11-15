
<template>
    <div class="table-data">
        <div class="table-data-box">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th rowspan="3">STT</th>
                        <th style="border-right: 1px solid;" rowspan="3">Tên</th>
                        <!-- tổng hợp -->
                        <th style="border:1px solid;" colspan="3">Tổng hợp</th>
                        <!--  luyện tập -->
                        <th style="border:1px solid;" colspan="8">Luyện tập</th>
                        <!-- kiểm tra -->
                        <th style="border:1px solid;" colspan="6">Kiểm tra</th>
                    </tr>
                    <tr>
                        <!-- tổng hợp -->
                        <th style="border-left: 1px solid;" rowspan="2">Sĩ số</th>
                        <th rowspan="2">HSHĐ</th>
                        <th style="border-right: 1px solid;" rowspan="2">Thời gian</th>
                        <!--  luyện tập -->
                        <th style="border-right: 1px solid;" colspan="3">Được giao qua link</th>
                        <th style="border-right: 1px solid;" colspan="3">GV giao trong lớp</th>
                        <th style="border-right: 1px solid;" colspan="2">Tự luyện</th>
                        <!-- kiểm tra -->
                        <th style="border-left: 1px solid; border-right: 1px solid;" colspan="3">Bài trong lớp</th>
                        <th style="border-left: 1px solid; border-right: 1px solid;" colspan="3">Bài khảo thí</th>
                    </tr>
                    <tr>
                        <!--  luyện tập -->
                        <th>TLLB</th>
                        <th>Điểm TB</th>
                        <th style="border-right: 1px solid;">TGLB</th>
                        <th>TLLB</th>
                        <th>Điểm TB</th>
                        <th style="border-right: 1px solid;">TGLB</th>
                        <th>TLLB</th>
                        <th style="border-right: 1px solid;">TGLB</th>
                         <!-- kiểm tra -->
                        <th>TLLB</th>
                        <th>Điểm TB</th>
                        <th style="border-right: 1px solid;">TGLB</th>
                        <th>TLLB</th>
                        <th>Điểm TB</th>
                        <th style="border-right: 1px solid;">TGLB</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td style="border-right: 1px solid;"></td>
                        <!-- tổng hợp -->
                        <td></td>
                        <td></td>
                        <td style="border-right: 1px solid;"></td>
                        <!--  luyện tập -->
                        <td></td>
                        <td></td>
                        <td style="border-right: 1px solid;"></td>
                        <td></td>
                        <td></td>
                        <!--tự luyện -->
                        <td style="border-right: 1px solid;"></td>
                        <td></td>
                        <td style="border-right: 1px solid;"></td>
                         <!-- kiểm tra -->
                        <td></td>
                        <td></td>
                        <td style="border-right: 1px solid;"></td>
                        <td></td>
                        <td></td>
                        <td style="border-right: 1px solid;"></td>
                    </tr>
                </tbody>
            </table>
            <div v-for="(item,i) in $store.state.FilterTable.filter(o=>['631753a026627e0694262021','631753b826627e0694262093','631753c626627e06942620df','6152c2d386f7a83034b2e673'].includes(o.id))" :key="i">
                <div>{{ item.name }} {{ item.id }}</div>
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                        <th rowspan="3">STT</th>
                        <th style="border-right: 1px solid;" rowspan="3">Tên</th>
                        <!-- tổng hợp -->
                        <!-- <th style="border:1px solid;" colspan="3">Tổng hợp</th> -->
                        <!--  luyện tập -->
                        <th style="border:1px solid;" colspan="8">Luyện tập</th>
                        <!-- kiểm tra -->
                        <th style="border:1px solid;" colspan="6">Kiểm tra</th>
                    </tr>
                    <tr>
                        <!-- tổng hợp -->
                        <!-- <th style="border-left: 1px solid;" rowspan="2">Sĩ số</th> -->
                        <!-- <th rowspan="2">HSHĐ</th> -->
                        <!-- <th style="border-right: 1px solid;" rowspan="2">Thời gian</th> -->
                        <!--  luyện tập -->
                        <th style="border-right: 1px solid;" colspan="3">Được giao qua link</th>
                        <th style="border-right: 1px solid;" colspan="3">GV giao trong lớp</th>
                        <th style="border-right: 1px solid;" colspan="2">Tự luyện</th>
                        <!-- kiểm tra -->
                        <th style="border-left: 1px solid; border-right: 1px solid;" colspan="3">Bài trong lớp</th>
                        <th style="border-left: 1px solid; border-right: 1px solid;" colspan="3">Bài khảo thí</th>
                    </tr>
                    <tr>
                        <!--  luyện tập -->
                        <th>TLLB (bài)</th>
                        <th>Điểm TB</th>
                        <th style="border-right: 1px solid;">TGLB (phút)</th>
                        <th>TLLB (bài)</th>
                        <th>Điểm TB</th>
                        <th style="border-right: 1px solid;">TGLB (phút)</th>
                        <th>TLLB (câu)</th>
                        <th style="border-right: 1px solid;">TGLB (phút)</th>
                         <!-- kiểm tra -->
                        <th>TLLB (bài)</th>
                        <th>Điểm TB</th>
                        <th style="border-right: 1px solid;">TGLB (phút)</th>
                        <th>TLLB (bài)</th>
                        <th>Điểm TB</th>
                        <th style="border-right: 1px solid;">TGLB (phút)</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(student,k) in getDataStudents(item.id)" :key="k">
                            <td>{{ (k+1) }}</td>
                            <td>{{ student.name }}</td>
                            <td v-for="(link,l) in getLink(item.id,student.id)"     :key="'link'+l">{{ link }}</td>
                            <td v-for="(link,l) in getLuyenTap(item.id,student.id)" :key="'link'+l">{{ link }}</td>
                            <td v-for="(link,l) in getTuLuyen(item.id,student.id)"  :key="'link'+l">{{ link }}</td>
                            <td v-for="(link,l) in getKiemTra(item.id,student.id)"  :key="'link'+l">{{ link }}</td>
                            <td v-for="(link,l) in getKhaoThi(item.id,student.id)"  :key="'link'+l">{{ link }}</td>
                            
                        </tr>
                    </tbody>
                </table>
                <!-- <div v-for="(student,k) in getDataStudents(item.id)" :key="k">
                    {{ student.name }}
                </div> -->
            </div>
        </div>
    </div>
</template>
<script lang="ts">
// import store from '@/store';
// import { computed, watch } from 'vue';
import store from '@/store';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
    @Prop()
    type !: number;

    public SiSoTotal = function(id:string){
       const classInfo = store.state.LuyenTap.TuLuyen.find(o=>o.id==id);
       if(classInfo) return classInfo.siso;
       return 0;
    }

    public getDataStudents(id:string){
        const info = store.state.LuyenTap.TuLuyen.find(o=>o.id == id);
        if(info){
            return info.ds;
        }
        return [];
    }
    public getLink(classid:string,studentid:string)    {
        const item = store.state.LuyenTap.Link.find(o=>o.classID == classid);
        if(item && Array.isArray(item.details) && item.totalLesson > 0){
            const student = item.details.find((x: { id: string; })=>x.id == studentid);
            if(student.tyLeThamGia > 0)
                return [(student.tyLeThamGia/100)*item.totalLesson,student.diem.toFixed(1),student.thoiGian.toFixed(1)];
            else
                return [0,'---','---'];
        }

        return ['---','---','---'];
    }
    public getLuyenTap(classid:string,studentid:string){
        const item = store.state.LuyenTap.Class.find(o=>o.classID == classid);
        if(item && Array.isArray(item.details) && item.totalLesson > 0){
            const student = item.details.find((x: { id: string; })=>x.id == studentid);
            return [(student.tyLeThamGia/100)*item.totalLesson,student.diem.toFixed(1),student.thoiGian.toFixed(1)];
        }

        return ['---','---','---'];
    }
    public getTuLuyen(classid:string,studentid:string) {
        const item = store.state.LuyenTap.TuLuyen.find(o=>o.id == classid);
        if(item && Array.isArray(item.ds)){
            const student = item.ds.find((x: { id: string; })=>x.id == studentid);
            if(student.questionTotal > 0)
            return [student.questionTotal,student.timeTotal.toFixed(1)];
        }

        return ['---','---'];
    }
    public getKiemTra(classid:string,studentid:string) {
        const item = store.state.kiemTra.Class.find(o=>o.classID == classid);
        if(item && Array.isArray(item.details) && item.totalLesson > 0){
            const student = item.details.find((x: { id: string; })=>x.id == studentid);
            return [(student.tyLeThamGia/100)*item.totalLesson,student.diem.toFixed(1),student.thoiGian.toFixed(1)];
        }

        return ['---','---','---'];
    }
    public getKhaoThi(classid:string,studentid:string) {
        const item = store.state.kiemTra.Exam.find(o=>o.classID == classid);
        if(item && Array.isArray(item.details) && item.totalLesson > 0){
            const student = item.details.find((x: { id: string; })=>x.id == studentid);
            return [(student.tyLeThamGia/100)*item.totalLesson,student.diem.toFixed(1),student.thoiGian.toFixed(1)];
        }

        return ['---','---','---'];
    }
}

</script>