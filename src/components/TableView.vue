
<template>
    <div class="table-data">
        <div class="table-data-box">
            <table id="report-table" class="table table-striped table-bordered table-report-table">
                <thead style="position: sticky; top: 0px; background-color: #fff;">
                    <tr>
                        <th rowspan="3"
                            style="border-left: 1px solid #000000;border-right:1px solid #000000; border-top: 1px solid #000000;">
                            STT</th>
                        <th rowspan="3" style="border-right:1px solid #000000; border-top: 1px solid #000000;">Tên</th>
                        <!-- tổng hợp -->
                        <template v-if="$store.state.View == 0 || $store.state.View == 3">
                            <th style="border-right:1px solid #000000; border-top: 1px solid #000000;"
                                :colspan="$store.state.Type == 2 ? '1' : '4'">Tổng hợp</th>
                        </template>
                        <!--  luyện tập -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <th style="border-right:1px solid #000000; border-top: 1px solid #000000;" colspan="6">Luyện tập
                            </th>
                        </template>
                        <!-- kiểm tra -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <th style="border-right:1px solid #000000; border-top: 1px solid #000000;"
                                :colspan="$store.state.Type == 2 ? '4' : '6'">Kiểm tra</th>
                        </template>
                    </tr>
                    <tr>
                        <!-- tổng hợp -->
                        <template v-if="$store.state.View == 0 || $store.state.View == 3">
                            <template v-if="$store.state.Type == 2">
                                <th style="border-right: 1px solid #000000;" rowspan="2"> Tổng thời gian hoạt động </th>
                            </template>
                            <template v-else>
                                <th style="border-left: 1px solid #000000;" rowspan="2">Tổng HS</th>
                                <th rowspan="2">Số HS hoạt động</th>
                                <th rowspan="2">Tỷ lệ</th>
                                <th style="border-right: 1px solid #000000;" rowspan="2">Thời gian hoạt động trung bình</th>
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
                            <th style="border-left: 1px solid #000000; border-right: 1px solid #000000;"
                                :colspan="$store.state.Type == 2 ? '2' : '3'">Bài kiểm tra trong lớp</th>
                            <th style="border-left: 1px solid #000000; border-right: 1px solid #000000;"
                                :colspan="$store.state.Type == 2 ? '2' : '3'">Bài kiểm tra trên khảo thí</th>
                        </template>
                    </tr>
                    <tr>
                        <!--  luyện tập -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <th>{{ $store.state.Type == 2 ? 'Tỷ lệ hoàn thành' : 'Tỷ lệ làm bài' }}</th>
                            <th style="border-right: 1px solid #000000;">{{ $store.state.Type == 2 ? 'Tổng thời gian luyện tập' : 'Thời gian LT TB' }}</th>

                            <th>{{ $store.state.Type == 2 ? 'Tỷ lệ hoàn thành' : 'Tỷ lệ làm bài' }}</th>
                            <th style="border-right: 1px solid #000000;">{{ $store.state.Type == 2 ? 'Tổng thời gian luyện tập' : 'Thời gian LT TB' }}</th>

                            <th>{{ $store.state.Type == 2 ? 'Tổng số câu tự luyện' : 'Tỷ lệ làm bài' }}</th>
                            <th style="border-right: 1px solid #000000;">{{ $store.state.Type == 2 ? 'Tổng thời gian luyện tập' : 'Thời gian LT TB' }}</th>
                        </template>
                        <!-- kiểm tra -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <th v-if="$store.state.Type != 2">Tỷ lệ làm bài</th>
                            <th>Điểm TB</th>
                            <th style="border-right: 1px solid #000000;">{{ $store.state.Type == 2 ? 'Thời gian làm bài TB'
                                : 'Thời gian LT TB' }}</th>
                            <th v-if="$store.state.Type != 2">Tỷ lệ làm bài</th>
                            <th>Điểm TB</th>
                            <th style="border-right: 1px solid #000000;">{{ $store.state.Type == 2 ? 'Thời gian làm bài TB'
                                : 'Thời gian LT TB' }}</th>
                        </template>
                        <!-- <template v-if="">
                            <th>Điểm TB</th>
                            <th style="border-right: 1px solid #000000;">Thời gian làm bài TB</th>
                            <th>Điểm TB</th>
                            <th style="border-right: 1px solid #000000;">Thời gian làm bài TB</th>
                        </template> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in $store.state.FilterTable" :key="i">
                        <td style="border-left: 1px solid #000000; border-right:1px solid #000000;">{{ (i + 1) }}</td>
                        <td style="border-right: 1px solid #000000; text-align: left;">{{ item.name }}</td>
                        <!-- tổng hợp -->
                        <template v-if="$store.state.View == 0 || $store.state.View == 3">
                            <td v-for="(td, k) in getTongHop(item.id)" :key="'total' + k" :style="td.style">{{ td.text }}
                            </td>
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
                    <tr style="border: 1px solid #000000; position: sticky; z-index: 2; bottom: 0;">
                        <td style="border-left: 1px solid #000000; border-right:1px solid #000000;" colspan="2">Tổng kết
                        </td>
                        <!-- <td style="border-right: 1px solid #000000; text-align: left;">{{ item.name }}</td> -->
                        <!-- tổng hợp -->
                        <template v-if="$store.state.View == 0 || $store.state.View == 3">
                            <td v-for="(td, k) in getAllTongHop()   " :key="'total' + k" :style="td.style">{{ td.text }}
                            </td>
                        </template>
                        <!-- link -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <td v-for="(td, k) in getAllLink()      " :key="'link' + k" :style="td.style">{{ td.text }}</td>
                        </template>
                        <!--  luyện tập -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <td v-for="(td, k) in getAllLuyenTap()  " :key="'lt' + k" :style="td.style">{{ td.text }}</td>
                        </template>
                        <!--tự luyện -->
                        <template v-if="$store.state.View == 1 || $store.state.View == 3">
                            <td v-for="(td, k) in getAllTuLuyen()   " :key="'tl' + k" :style="td.style">{{ td.text }}</td>
                        </template>

                        <!-- kiểm tra -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <td v-for="(td, k) in getAllKiemTra()   " :key="'bg' + k" :style="td.style">{{ td.text }}</td>
                        </template>

                        <!-- khao thi -->
                        <template v-if="$store.state.View == 2 || $store.state.View == 3">
                            <td v-for="(td, k) in getAllKhaoThi()   " :key="'kt' + k" :style="td.style">{{ td.text }}</td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts">
import store from '@/store';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
    @Prop()
    type !: number;

    public totalData :{
        TongHop: {
            HS: Number[],
            HSHD: Number[],
            TyLe: Number[],
            TGHDTB: Number[]
        },
        LuyenTap: {
            link: {TyLe:Number[],TGLB:Number[]},
            Class: {TyLe:Number[],TGLB:Number[]},
            Self: {TyLe:Number[],TGLB:Number[]}
        },
        KiemTra: {
            Class: {TyLe:Number[],TGLB:Number[],DTB:Number[]},
            Exam: {TyLe:Number[],TGLB:Number[],DTB:Number[]}
        }
    } = {
        TongHop: {
            HS: [],
            HSHD: [],
            TyLe: [],
            TGHDTB:[]
        },
        LuyenTap: {
            link: {TyLe:[],TGLB:[]},
            Class: {TyLe:[],TGLB:[]},
            Self: {TyLe:[],TGLB:[]}
        },
        KiemTra: {
            Class: {TyLe:[],TGLB:[],DTB:[]},
            Exam: {TyLe:[],TGLB:[],DTB:[]}
        }
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
            tghd += luyenTapData.times;
            if (luyenTapData.studentIDs)
                dataStudens = dataStudens.concat([], luyenTapData.studentIDs)
            // console.log(luyenTapData.studentIDs)
        }
        if (linkData) {
            tghd += linkData.times;
            if (linkData.studentIDs)
                dataStudens = dataStudens.concat([], linkData.studentIDs)
            // console.log(linkData.studentIDs)
        }
        if (kiemTraData) {
            tghd += kiemTraData.times;
            if (kiemTraData.studentIDs)
                dataStudens = dataStudens.concat([], kiemTraData.studentIDs)
            // console.log(kiemTraData.studentIDs)
        }
        if (khaoThiData) {
            tghd += khaoThiData.times;
            if (khaoThiData.studentIDs)
                dataStudens = dataStudens.concat([], khaoThiData.studentIDs)
            // console.log(khaoThiData.studentIDs)
        }
        if (tuLuyenData) {
            tghd += tuLuyenData.tgtl;
            if (tuLuyenData.hstg)
                dataStudens = dataStudens.concat([], tuLuyenData.hstg)
            // console.log(tuLuyenData.hstg)
        }
        var studentActive = Array.from(new Set(dataStudens)).filter(o => o != null && o.length > 10);

        this.totalData.TongHop.HS.push(siso);
        

        // console.log(studentActive)
        // console.log("----------------------")
        if (studentActive.length > 0) {
            const dataStudentActive: number = ((studentActive.length / siso) * 100);
            if (dataStudentActive == Infinity) {

                this.totalData.TongHop.HSHD.push(studentActive.length);
                this.totalData.TongHop.TyLe.push(dataStudentActive);

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
                text: linkData.times.toFixed(1),
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
                text: linkData.times.toFixed(1),
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
                text: linkData.times.toFixed(1),
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
                text: linkData.tyleThamGia.toFixed(1) + "%",
                style: 'text-align: center'
            },
            {
                text: linkData.points.toFixed(1),
                style: 'text-align: center'
            },
            {
                text: linkData.times.toFixed(1),
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
                text: linkData.tgtl.toFixed(1),
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
    public getAllTongHop() {
        console.log("getAllTongHop")
        // if (store.state.Type == 2) {

        // }


        return [{
            text: "---",
            style: 'text-align: center'
        },
        {
            text: "---",
            style: 'border-right: 1px solid #000000; text-align: center'
        }];
    }
    public getAllLink() {
        console.log("getAllLink")
        return [{
            text: "---",
            style: 'text-align: center'
        },
        {
            text: "---",
            style: 'border-right: 1px solid #000000; text-align: center'
        }];
    }
    public getAllLuyenTap() {
        console.log("getAllLuyenTap")
        return [{
            text: "---",
            style: 'text-align: center'
        },
        {
            text: "---",
            style: 'border-right: 1px solid #000000; text-align: center'
        }];
    }
    public getAllTuLuyen() {
        console.log("getAllTuLuyen")
        return [{
            text: "---",
            style: 'text-align: center'
        },
        {
            text: "---",
            style: 'border-right: 1px solid #000000; text-align: center'
        }];
    }
    public getAllKiemTra() {
        console.log("getAllKiemTra")
        return [{
            text: "---",
            style: 'text-align: center'
        },
        {
            text: "---",
            style: 'border-right: 1px solid #000000; text-align: center'
        }];
    }
    public getAllKhaoThi() {
        console.log("getAllKhaoThi")
        return [{
            text: "---",
            style: 'text-align: center'
        },
        {
            text: "---",
            style: 'border-right: 1px solid #000000; text-align: center'
        }];
    }

}

</script>

<style>.table-report-table th {
    text-align: center;
    vertical-align: middle;
}</style>