<template>
    <div class="filter">
        <div class="filter-box">
            <div class="filter-group">
                <filter-date @on-update="updateDate" v-model="filterRange"></filter-date>
            </div>
            <div class="filter-group">
                <filter-item name="report-region" :multiple="false" placeholder="Chọn khu vực" :options="Regions"
                    :select-first="false" :hide-selected="true" @on-change="changeRegions"
                    @close="loadCenters"></filter-item>

                <filter-item name="report-center" :multiple="false" placeholder="Chọn cơ sở" :options="Centers"
                    :select-first="false" :hide-selected="true" @on-change="changeCenter" @close="loadClass"></filter-item>

                <filter-item name="report-level" :multiple="false" placeholder="Chọn khối" :options="Levels"
                    :select-first="false" :hide-selected="true" @on-change="changeLevel"></filter-item>

                <filter-item name="report-class" :multiple="false" placeholder="Chọn lớp" :options="ListClass"
                    :select-first="false" :hide-selected="true" @on-change="changeClass"></filter-item>
            </div>
            <filter-tab class="filter-group" :data="DataReportView" @on-select="changeView" :text="'Tùy chọn báo cáo :'"
                :name="'report-type'"></filter-tab>
            <div class="filter-group">
                <!-- <filter-item name="report-type" :multiple="false" placeholder="Chọn kiểu báo cáo" :options="DataReportView"
                    :select-first="true" :hide-selected="true">
                    Tùy chọn báo cáo
                </filter-item> -->

            </div>
            <button @click="applyFilter">Áp dụng</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { caculatorDate } from "../utils/common";
import FilterItem from './FilterItem.vue';
import FilterDate from './FilterDate.vue';
import store from '@/store';
import FilterTab from './FilterTab.vue';
import Helper from '../store/helper';
const DataReportView = [
    { id: 0, name: 'Tổng hợp' },
    { id: 1, name: 'Luyện tập' },
    { id: 2, name: 'Kiểm tra' },
    { id: 3, name: 'Tất cả' },
]

const now  = caculatorDate(new Date(),"week");

const filterRange = ref<{start:Date, end:Date}>({start:now.first,end:now.last});
const filterClass = ref<{ id: string, name: string, center: string, region: string } | null>(null);
const filterCenter = ref<{ id: string, name: string, region: string } | null>(null);
const filterRegion = ref<{ id: string, name: string } | null>(null);
const filterLevel = ref<{ id: string, name: string } | null>(null);

const Levels = computed(() => { return store.state.Levels });
const ListClass = computed(() => { return store.state.Class ?? []; });
const Regions = computed(() => { return store.state.Regions ?? []; });
const Centers = computed(() => { return store.state.Centers ?? []; });

const changeRegions = function (value: { id: string, name: string } | null) {
    filterRegion.value = value;
}

const changeLevel = function (value: { id: string, name: string } | null) {
    filterLevel.value = value;
}

const changeCenter = function (value: { id: string, name: string, region:string } | null) {
    filterCenter.value = value;
}

const loadCenters = function (value: { id: string, name: string } | null) {
    if (value) {
        store.dispatch('getCenters', value.id);
    }
}
const loadClass = function (value: { id: string, name: string } | null) {
    if (value) {
        store.dispatch('getClass', value.id);
    }
}
const changeClass = function (value: { id: string, name: string, center: string, region: string } | null) {
    filterClass.value = value;
}
const changeView = function (value: { id: string, name: string }) {
    console.log(value);
}
const updateDate = function (range: { startDate: Date, endDate: Date }) {
    console.log(range);
    filterRange.value.start = range.startDate;
    filterRange.value.end = range.endDate;
}

onMounted(() => {
    store.dispatch('getRegions');
});

const syncDataCount = function(data:string[]){
    syncKiemTra(data,0, data.length, filterRange.value.start, filterRange.value.end);
    syncLuyenTap(data,0, data.length, filterRange.value.start, filterRange.value.end);
}

const syncKiemTra = function(classids:string[], i : number, limit:number, start: Date, end: Date){
    Helper.LoadBaiKiemTra(classids[i],start,end).then(res=>{
        console.log(res);
        i++;
        if(i < limit){
            syncKiemTra(classids,i,limit,start,end);
        }
    });
    
}
const syncLuyenTap = function(classids:string[], i : number, limit:number, start: Date, end: Date){
    Helper.LoadBaiLuyenTap(classids[i],start,end).then(res=>{
        console.log(res);
        i++;
        if(i < limit){
            syncLuyenTap(classids,i,limit,start,end);
        }
    });
}

const syncData = function(type:number,id:string){
    console.log(filterRange.value)
    switch(type){
        default:
            Helper.CountClass(id,0,filterRange.value.start,filterRange.value.end).then(res=>{
                if(res && res.data){
                    if(res.data.n > 0){
                        syncDataCount(res.data.l);
                    }
                }
            })
            // Helper.GetCenters(id).then(res=>{
            //     if(res.data != null){
            //         store.commit("SET_DATA_VIEW",{id:id,centers:res.data})
            //     }
            // })
            break;
    }
}

const loadFilterData = function(type:number){
    const data : {id:string, name:string}[] = store.state.FilterTable ?? [];
    if(data != null && data.length > 0){
        const count = data.length;
        for(let i =0; i < count; i++){
            const item = data[i];
            syncData(type,item.id);
        }
    }
}


const applyFilter = function () {

    store.dispatch("clearData");

    let type = 0;
    if (filterClass.value != null){
        type = 3;
        console.log("load data theo class")
    }
    else{
        if(filterCenter.value != null){
            type = 2;
            console.log("load data theo center")
        }
        else{
            if(filterRegion.value != null){
                type = 1;
                console.log("load data theo region")
            }
            else{
                type = 0;
                console.log("load data all region")
            }
        }
    }
    store.dispatch("setData",type);
    loadFilterData(type);
    console.log(store.state.FilterTable);
}


</script>
<style lang="scss">
.filter-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .filter-item {
        flex: 0 0 auto;
        padding: 0 2px;
    }

    .flex-100 {
        flex-basis: 100%;
    }
}
</style>
