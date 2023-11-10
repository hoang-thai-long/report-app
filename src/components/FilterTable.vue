<template>
    <div class="filter">
        <div class="filter-box row">
            <div class="filter-item">
                <button class="btn btn-tab">Tháng</button>
                <button class="btn btn-tab">Tuần</button>
                <input type="date" name="" id="">
                <input type="date" name="" id="">
                <filter-date></filter-date>
            </div>
            <filter-item class="col" name="report-region" :multiple="false" placeholder="Chọn khu vực" :options="Regions"
                :select-first="false" :hide-selected="true" @on-change="changeRegions" @close="loadCenters"></filter-item>

            <filter-item class="col" name="report-center" :multiple="false" placeholder="Chọn cơ sở" :options="Centers"
                :select-first="false" :hide-selected="true" @close="loadClass"></filter-item>

            <filter-item class="col" name="report-class" :multiple="false" placeholder="Chọn lớp" :options="ListClass"
                :select-first="false" :hide-selected="true"></filter-item>

            <filter-item class="col" name="report-type" :multiple="false" placeholder="Chọn kiểu báo cáo"
                :options="DataReportView" :select-first="true" :hide-selected="true">
                Tùy chọn báo cáo
            </filter-item>

            <button>Áp dụng</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import FilterItem from './FilterItem.vue';
import FilterDate from './FilterDate.vue';
import store from '@/store';
const DataReportView = [
    { id: 0, name: 'Tổng hợp' },
    { id: 1, name: 'Luyện tập' },
    { id: 2, name: 'Kiểm tra' },
    { id: 3, name: 'Tất cả' },
]
const ListClass = computed(() => { return store.state.Class; });
const Regions = computed(() => { return store.state.Regions; });
const Centers = computed(() => { return store.state.Centers; });

const changeRegions = function (value: [{ id: string, name: string }] | null) {
    console.log(value);
}
const loadCenters = function (value: { id: string, name: string } | null) {
    if (value) {
        store.dispatch('getCenters', value.id);
    }
}
const loadClass = function (value:{id:string,name:string}|null){
    if(value){
        store.dispatch('getClass',value.id);
    }
}

onMounted(() => {
    store.dispatch('getRegions');
});

</script>

