<template>
    <div class="filter">
        <div class="filter-box">
            <div class="filter-item">
                <button class="btn btn-tab">Tháng</button>
                <button class="btn btn-tab">Tuần</button>
                <input type="date" name="" id="">
                <input type="date" name="" id="">
            </div>
            <div class="filter-item">
                <select name="" id="">
                    <option value="">Khu vực</option>
                </select>
                <select name="" id="">
                    <option value="">Cơ sở</option>
                </select>
                <select name="" id="">
                    <option value="">Level</option>
                </select>
                <select name="" id="">
                    <option value="">Lớp</option>
                </select>
            </div>
            <filter-item name="report-center" :multiple="true" placeholder="Chọn khu vực" :options="Centers"
                :select-first="false" :hide-selected="true"></filter-item>
            <filter-item name="report-region" :multiple="true" placeholder="Chọn khu vực" :options="Regions"
                :select-first="false" :hide-selected="true" @on-change="changeRegions" @close="loadCenters"></filter-item>
            <filter-item name="report-type" :multiple="false" placeholder="Chọn kiểu báo cáo" :options="DataReportView"
                :select-first="true" :hide-selected="true">
                Tùy chọn báo cáo
            </filter-item>

            <button>Áp dụng</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import FilterItem from './FilterItem.vue';
import store from '@/store';
const DataReportView = [
    { id: 0, name: 'Tổng hợp' },
    { id: 1, name: 'Luyện tập' },
    { id: 2, name: 'Kiểm tra' },
    { id: 3, name: 'Tất cả' },
]

const Regions = computed(()=> { return store.state.Regions;});
const Centers = computed(()=> { return store.state.Centers;});

const changeRegions = function(value:[{id:string,name:string}]|null){
    console.log(value);
}
const loadCenters = function(value:[{id:string,name:string}]|null){
    if(value){
        store.dispatch('getCenters',value.map(o=>o.id));
    }
}

onMounted(() => {
    store.dispatch('getRegions');
});

</script>

