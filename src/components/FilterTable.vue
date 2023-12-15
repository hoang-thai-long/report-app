<template>
    <div class="rt-filter mt-1">
        <div class="rt-filter-box" style="position: relative;">
            <div class="rt-filter-group">
                <filter-date @on-update="updateDate" v-model="filterRange"></filter-date>
                <filter-item name="report-region" :multiple="false" placeholder="Chọn khu vực" :options="Regions"
                    :select-first="$store.state.CenterCode != 'eduso'" :hide-selected="false" @on-change="changeRegions"
                    @close="loadCenters"></filter-item>

                <filter-item name="report-center" :multiple="false" placeholder="Chọn cơ sở" :options="Centers"
                    :select-first="$store.state.CenterCode != 'eduso'" :hide-selected="false" @on-change="changeCenter"
                    @close="loadClass"></filter-item>
                <filter-item name="report-level" :multiple="false" placeholder="Chọn khối" :options="$store.state.Levels"
                    :select-first="false" :hide-selected="false" @on-change="changeLevel"></filter-item>

                <filter-item name="report-class" :multiple="false" placeholder="Chọn lớp" :options="ListClass"
                    :select-first="false" :hide-selected="false" @on-change="changeClass"></filter-item>
                <filter-item v-if="filterCenter && !filterClass" name="report-teacher" :multiple="false"
                    placeholder="Chọn giáo viên" :options="ListTeacher" :select-first="false" :hide-selected="false"
                    @on-change="changeTeacher"></filter-item>
            </div>
            <filter-tab class="rt-filter-group" :data="DataReportView" @on-select="changeView" :text="'Tùy chọn báo cáo :'"
                :name="'report-type'"></filter-tab>
            <button class="btn btn-primary" @click="applyFilter" style="position: absolute; bottom: 10px;right: 10px;">Áp
                dụng</button>
            <button class="btn btn-primary" @click="exportExcel"
                style="position: absolute; bottom: 10px;right: 100px;">Export</button>
        </div>
        <div class="progress-bar__container" v-if="$store.state.loadding > 0">
            <div class="progress-bar" :style="'left:'+($store.state.loadding*100/max)+'%'">
                <span class="progress-bar__text">Uploaded Successfully!</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { caculatorDate, exportExcelFromTable } from "../utils/common";
import FilterItem from './FilterItem.vue';
import FilterDate from './FilterDate.vue';
import store from '@/store';
import FilterTab from './FilterTab.vue';
import { ExportExcel } from '@/store/request';
// import Helper from '../store/helper';

const props = defineProps({
    CenterCode: {
        type: String
    },
    TeacherID: {
        type: String
    },
    HeadTeacher: {
        type: Boolean
    }
});

const DataReportView = [
    { id: 0, name: 'Tổng hợp' },
    { id: 1, name: 'Luyện tập' },
    { id: 2, name: 'Kiểm tra' },
    { id: 3, name: 'Tất cả' },
]

const now = caculatorDate(new Date(), "week");

const filterRange = ref<{ start: Date, end: Date }>({ start: now.first, end: now.last });
const filterClass = ref<{ id: string, name: string, center: string, region: string, level: string } | null>(null);
const filterCenter = ref<{ id: string, name: string, region: string, levels: number[] } | null>(null);
const filterRegion = ref<{ id: string, name: string } | null>(null);
const filterLevel = ref<{ id: string, name: string } | null>(null);

// const Levels = computed(() => { return store.state.Levels });
const ListTeacher = computed(() => { return store.state.ListTeachers ?? []; });
const ListClass = computed(() => { return store.state.Class ?? []; });
const Regions = computed(() => { return store.state.Regions ?? []; });
const Centers = computed(() => { return store.state.Centers ?? []; });

const changeRegions = function (value: { id: string, name: string } | null) {
    filterRegion.value = value;
}

const changeLevel = function (value: { id: string, name: string } | null) {
    filterLevel.value = value;
    store.commit('SET_LEVEL_DATA', filterLevel.value?.id);
}

const changeCenter = function (value: { id: string, name: string, region: string, levels: number[] } | null) {
    filterCenter.value = value;
}

const loadCenters = function (value: { id: string, name: string } | null) {
    if (value) {
        store.dispatch('getCenters', { id: value.id, start: filterRange.value.start, end: filterRange.value.end });
    }
}
const loadClass = function (value: { id: string, name: string } | null) {
    if (value) {
        store.dispatch('getClass', { id: value.id, start: filterRange.value.start, end: filterRange.value.end });
    }
}
const changeClass = function (value: { id: string, name: string, center: string, region: string, level: string } | null) {
    filterClass.value = value;
    if (value) {
        store.commit('SET_CLASS_FILTER', value.id);
        store.dispatch('getStudents', value.id);
    }
}
const changeTeacher = function (value: { id: string, name: string, classIDs: string[] } | null) {
    store.commit('SET_TEACHER_VIEW', value)
}
const changeView = function (value: { id: string, name: string }) {
    console.log('changeView', value);
    store.dispatch('changeView', value)
}
const updateDate = function (range: { startDate: Date, endDate: Date }) {
    filterRange.value.start = range.startDate;
    filterRange.value.end = range.endDate;
}

onMounted(() => {
    store.commit('SET_CENTER_CODE', props.CenterCode);
    store.dispatch('setUseID', { ID: props.TeacherID, Type: props.HeadTeacher });
    // console.log({ID:props.TeacherID,Type:props.HeadTeacher});
    store.dispatch('getRegions');
});
let tuLuyenRequest: string[] = [];
let linkRequest: string[] = [];
let kiemTraRequest: string[] = [];
let khaoThiRequest: string[] = [];
let luyenTapRequest: string[] = [];

const max = ref(0);

const syncDataCount = function (type: number) {
    tuLuyenRequest = [];
    linkRequest = [];
    kiemTraRequest = [];
    khaoThiRequest = [];
    luyenTapRequest = [];
    let data: string[] = [];
    switch (type) {
        case 1: // region
            data = store.state.Centers.map(o => o.id);
            break;
        case 2: // center
            if (filterLevel.value) {
                const idlevel = filterLevel.value.id;
                data = store.state.Class.filter(o => o.level == idlevel).map(o => o.id)
            }
            else {
                data = store.state.Class.map(o => o.id);
            }
            break;
        case 3: // in class
            if (filterClass.value)
                data = [filterClass.value.id];
            break;
        default: // all region
            data = store.state.Regions.map(o => o.id);
            break;
    }

    store.commit('SET_LOADING', data.length * 5);
    max.value = store.state.loadding;
    // bai trong lop
    syncKiemTra(data, 0, data.length, filterRange.value.start, filterRange.value.end, type);
    // bai khao thi
    syncBaiKhaoThi(data, 0, data.length, filterRange.value.start, filterRange.value.end, type);
    // bai trong lop
    syncLuyenTap(data, 0, data.length, filterRange.value.start, filterRange.value.end, type);
    // qua link
    syncLink(data, 0, data.length, filterRange.value.start, filterRange.value.end, type);
    // tự luyện
    syncTuLuyen(data, 0, data.length, filterRange.value.start, filterRange.value.end, type);
}

const syncTuLuyen = function (classids: string[], i: number, limit: number, start: Date, end: Date, type: number) {
    const classid = classids[i];
    i++;
    if (tuLuyenRequest.includes(classid)) return;
    tuLuyenRequest.push(classid);
    store.dispatch("getTuLuyen", { classid: classid, start: start, end: end, type: type }).then(() => {
        store.commit('SUB_LOADING');
        if (i < limit) {
            return syncTuLuyen(classids, i, limit, start, end, type);
        }
    });
}
const syncLink = function (classids: string[], i: number, limit: number, start: Date, end: Date, type: number) {
    const classid = classids[i];
    i++;
    if (linkRequest.includes(classid)) return;
    linkRequest.push(classid);
    store.dispatch("getLink", { classid: classid, start: start, end: end, type: type }).then(() => {
        store.commit('SUB_LOADING');
        if (i < limit) {
            return syncLink(classids, i, limit, start, end, type);
        }
    });
}

const syncBaiKhaoThi = function (classids: string[], i: number, limit: number, start: Date, end: Date, type: number) {
    const classid = classids[i];
    i++;
    if (khaoThiRequest.includes(classid)) return;
    khaoThiRequest.push(classid);
    store.dispatch("getKhaoThi", { classid: classid, start: start, end: end, type: type }).then(() => {
        store.commit('SUB_LOADING');
        if (i < limit) {
            return syncBaiKhaoThi(classids, i, limit, start, end, type);
        }
    });
}

const syncKiemTra = function (classids: string[], i: number, limit: number, start: Date, end: Date, type: number) {
    const classid = classids[i];
    i++;
    if (kiemTraRequest.includes(classid)) return;
    kiemTraRequest.push(classid);
    store.dispatch("getKiemTra", { classid: classid, start: start, end: end, type: type }).then(() => {
        store.commit('SUB_LOADING');
        if (i < limit) {
            return syncKiemTra(classids, i, limit, start, end, type);
        }
    });
}
const syncLuyenTap = function (classids: string[], i: number, limit: number, start: Date, end: Date, type: number) {
    const classid = classids[i];
    i++;
    if (luyenTapRequest.includes(classid)) return;
    luyenTapRequest.push(classid);
    store.dispatch("getLuyenTap", { classid: classid, start: start, end: end, type: type })
        .then(() => {
            store.commit('SUB_LOADING');
            if (i < limit) {
                return syncLuyenTap(classids, i, limit, start, end, type);
            }
        });
}
// let countClassFromRegion: string[] = [];
// const countClass = function (regionids: string[], i: number, limit: number) {
//     const regionid = regionids[i];
//     i++;
//     if (countClassFromRegion.includes(regionid)) return;
//     countClassFromRegion.push(regionid);
//     Helper.CountClass(regionid, 0, filterRange.value.start, filterRange.value.end).then(res => {
//         if (res && res.data && res.data.n > 0) {
//             store.dispatch("setClassRegion", res.data.l);
//         }
//         if (i < limit) {
//             return countClass(regionids, i, limit);
//         }
//         else {
//             syncDataCount(store.state.DataClass.map((o: { id: string; }) => o.id));
//         }
//     });
// }

const loadFilterData = function (type: number) {
    // store.dispatch("clearDataClass");
    // const data: { id: string, name: string }[] = store.state.FilterTable ?? [];
    switch (type) {
        case 0: syncDataCount(1);
            break;
        case 1: syncDataCount(2);
            break;
        case 2:
            if (filterClass != null && filterClass.value != null) syncDataCount(3);
            break;
        default: syncDataCount(0);
            break;
    }
}


const applyFilter = function () {
    // countClassFromRegion = [];
    store.dispatch("clearData");

    let type = -1;
    if (filterClass.value != null) {
        type = 2;
        console.log("load data theo class")
    }
    else {
        if (filterCenter.value != null) {
            type = 1;
            console.log("load data theo center")
        }
        else {
            if (filterRegion.value != null) {
                type = 0;
                console.log("load data theo region")
            }
            else {
                type = -1;
                console.log("load data all region")
            }
        }
    }
    store.dispatch("setData", type);
    loadFilterData(type);
}

const exportExcel = function () {
    const start = filterRange.value.start.getFullYear() + "-" + (filterRange.value.start.getMonth() + 1) + "-" + filterRange.value.start.getDate();
    const end = filterRange.value.end.getFullYear() + "-" + (filterRange.value.end.getMonth() + 1) + "-" + filterRange.value.end.getDate();
    var data = exportExcelFromTable('report-table', 'baocaotonghop', start, end);
    ExportExcel(data.data, data.url);
}

</script>
<style lang="scss" scoped>
.rt-filter-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .rt-filter-item {
        display: flex;
        margin-right: 5px;
        flex: 0 0 auto;
        padding: 0 2px;
    }

    .flex-100 {
        flex-basis: 100%;
    }
}

.progress-bar__container {
    width: 100%;
    height: 2px;
    border-radius: 2rem;
    position: relative;
    overflow: hidden;
    transition: all 0.5s;
    will-change: transform;
    box-shadow: 0 0 5px #51e792;
}

.progress-bar {
    position: absolute;
    height: 100%;
    width: 100%;
    content: "";
    background-color: #51e792;
    top: 0;
    bottom: 0;
    left: -100%;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: sans-serif;
}

.progress-bar__text {
    display: none;
}</style>
