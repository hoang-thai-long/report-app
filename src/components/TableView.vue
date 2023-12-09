
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
                    <tr v-if="$store.state.View == 1 || $store.state.View == 3 || $store.state.View == 2">
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
                    <tr>
                        <td style="border-left: 1px solid #000000; border-right:1px solid #000000;" colspan="2">Tổng kết</td>
                        <td v-for="(td,k) in getTongKet()" :key="'tk' + k" :style="td.style">{{ td.text }}</td>
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
        let tglt = 0, tglink = 0, tgkt = 0, tgkt2 = 0 , tgtl = 0;
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
            tglt = luyenTapData.times;
            if (luyenTapData.studentIDs)
                dataStudens = dataStudens.concat([], luyenTapData.studentIDs)
            // console.log(luyenTapData.studentIDs)
        }
        if (linkData) {
            tghd += linkData.times;
            tglink = linkData.times;
            if (linkData.studentIDs)
                dataStudens = dataStudens.concat([], linkData.studentIDs)
            // console.log(linkData.studentIDs)
        }
        if (kiemTraData) {
            tghd += kiemTraData.times;
            tgkt = kiemTraData.times;
            if (kiemTraData.studentIDs)
                dataStudens = dataStudens.concat([], kiemTraData.studentIDs)
            // console.log(kiemTraData.studentIDs)
        }
        if (khaoThiData) {
            tghd += khaoThiData.times;
            tgkt2 = khaoThiData.times;
            if (khaoThiData.studentIDs)
                dataStudens = dataStudens.concat([], khaoThiData.studentIDs)
            // console.log(khaoThiData.studentIDs)
        }
        if (tuLuyenData) {
            tghd += tuLuyenData.tgtl;
            tgtl = tuLuyenData.tgtl;
            if (tuLuyenData.hstg)
                dataStudens = dataStudens.concat([], tuLuyenData.hstg)
            // console.log(tuLuyenData.hstg)
        }

        console.log(id,tglt, tglink, tgkt, tgkt2 , tgtl)

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


    public getTongKet(){

        const dataStudentLink = store.state.LuyenTap.Link.map(o=>o.studentIDs);
        const dataStudentClass = store.state.LuyenTap.Class.map(o=>o.studentIDs);
        const dataStudentTuLuyen = store.state.LuyenTap.TuLuyen.map(o=>o.hstg);
        const dataStudentKiemTra = store.state.kiemTra.Class.map(o=>o.studentIDs);
        const dataStudentKhaoThi = store.state.kiemTra.Exam.map(o=>o.studentIDs);

         
        const trueDataTimeLink      = store.state.LuyenTap.Link.map(o=>o.times).filter(o=>o > 0)  
        const trueDataTimeClass     = store.state.LuyenTap.Class.map(o=>o.times).filter(o=>o > 0) 
        const trueDataTimeTuLuyen   = store.state.LuyenTap.TuLuyen.map(o=>o.tgtl).filter(o=>o > 0)
        const trueDataTimeKiemTra   = store.state.kiemTra.Class.map(o=>o.times).filter(o=>o > 0)  
        const trueDataTimeKhaoThi   = store.state.kiemTra.Exam.map(o=>o.times).filter(o=>o > 0)   


        const dataTimeLink      = trueDataTimeLink   .reduce((a,b)=>(a+b),0);
        const dataTimeClass     = trueDataTimeClass  .reduce((a,b)=>(a+b),0);
        const dataTimeTuLuyen   = trueDataTimeTuLuyen.reduce((a,b)=>(a+b),0);
        const dataTimeKiemTra   = trueDataTimeKiemTra.reduce((a,b)=>(a+b),0);
        const dataTimeKhaoThi   = trueDataTimeKhaoThi.reduce((a,b)=>(a+b),0);

        const timeLink      = dataTimeLink > 0 ? (dataTimeLink/       trueDataTimeLink   .length) : 0;
        const timeClass     = dataTimeClass > 0 ? (dataTimeClass/     trueDataTimeClass  .length) : 0;
        const timeTuLuyen   = dataTimeTuLuyen > 0 ? (dataTimeTuLuyen/ trueDataTimeTuLuyen.length) : 0;
        const timeKiemTra   = dataTimeKiemTra > 0 ? (dataTimeKiemTra/ trueDataTimeKiemTra.length) : 0;
        const timeKhaoThi   = dataTimeKhaoThi > 0 ? (dataTimeKhaoThi/ trueDataTimeKhaoThi.length) : 0;
        
        console.log(dataTimeLink    + dataTimeClass   + dataTimeTuLuyen + dataTimeKiemTra + dataTimeKhaoThi);
        console.log(trueDataTimeLink   ,trueDataTimeClass  ,trueDataTimeTuLuyen,trueDataTimeKiemTra,trueDataTimeKhaoThi);

        const dataTimes = [timeLink,timeClass,timeTuLuyen,timeKiemTra,timeKhaoThi].reduce((a,b)=>a+b,0);

        // console.log(dataTimes);

        const listStudents = dataStudentLink.concat(dataStudentClass,dataStudentTuLuyen,dataStudentKiemTra,dataStudentKhaoThi).filter(o=> o && o.length > 0);
        const dataActive = this.mergeArray<string[]>(listStudents,0);
        const siso = store.state.LuyenTap.Link.map(o=>o.siSo).reduce((a,b)=>(a+b),0);

        const students = Array.from(new Set(dataActive)).filter(o => o != null && o.length > 10)

        const studentActive = dataActive && dataActive.length > 0 ? students.length : 0;
        const studentTimes = dataTimes > 0 ? dataTimes.toFixed(1) : "---";
        // console.log(data);
        // console.log(listStudents, students);
        return [
                {
                    text: siso == 0 ? "---" : siso,
                    style: 'text-align: center'
                },
                {
                    text: studentActive == 0 ? "---" : studentActive,
                    style: 'text-align: center'
                },
                {
                    text: studentActive == 0 ? "---" : ((studentActive/siso)*100).toFixed(1)+"%",
                    style: 'text-align: center'
                },
                {
                    text:studentTimes,
                    style: 'text-align: center; border-right:1px solid #000'
                },
                {
                    text: '---',
                    style: 'text-align: center'
                },
                {
                    text:timeLink > 0 ? timeLink.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                {
                    text: '---',
                    style: 'text-align: center'
                },
                {
                    text:timeClass > 0 ? timeClass.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                {
                    text: '---',
                    style: 'text-align: center'
                },
                {
                    text:timeTuLuyen > 0 ? timeTuLuyen.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                {
                    text: '---',
                    style: 'text-align: center'
                },
                {
                    text: '---',
                    style: 'text-align: center'
                },
                {
                    text:timeKiemTra > 0 ? timeKiemTra.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                },
                {
                    text: '---',
                    style: 'text-align: center'
                },
                {
                    text: '---',
                    style: 'text-align: center'
                },
                {
                    text:timeKhaoThi > 0 ? timeKhaoThi.toFixed(1) : '---',
                    style: 'text-align: center; border-right:1px solid #000'
                }
            ]

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
    th
    {
        text-align: center;
    vertical-align: middle;
    }
}
</style>