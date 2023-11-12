<template>
    <div class="filter">
        <div class="filter-box">
            <div class="filter-group">
                <filter-date @on-update="updateDate"></filter-date>
            </div>
            <div class="filter-group">
                <filter-item name="report-region" :multiple="false" placeholder="Chọn khu vực" :options="Regions"
                    :select-first="false" :hide-selected="true" @on-change="changeRegions"
                    @close="loadCenters"></filter-item>

                <filter-item name="report-center" :multiple="false" placeholder="Chọn cơ sở" :options="Centers"
                    :select-first="false" :hide-selected="true" @close="loadClass"></filter-item>

                <filter-item name="report-level" :multiple="false" placeholder="Chọn khối" :options="Levels"
                    :select-first="false" :hide-selected="true"></filter-item>

                <filter-item name="report-class" :multiple="false" placeholder="Chọn lớp" :options="ListClass"
                    :select-first="false" :hide-selected="true"></filter-item>
            </div>
            <filter-tab class="filter-group" :data="DataReportView" @on-select="changeView" :text="'Tùy chọn báo cáo :'" :name="'report-type'"></filter-tab>
            <div class="filter-group">
                <!-- <filter-item name="report-type" :multiple="false" placeholder="Chọn kiểu báo cáo" :options="DataReportView"
                    :select-first="true" :hide-selected="true">
                    Tùy chọn báo cáo
                </filter-item> -->
                
            </div>
            <button>Áp dụng</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import FilterItem from './FilterItem.vue';
import FilterDate from './FilterDate.vue';
import store from '@/store';
import FilterTab from './FilterTab.vue';
const DataReportView = [
    { id: 0, name: 'Tổng hợp' },
    { id: 1, name: 'Luyện tập' },
    { id: 2, name: 'Kiểm tra' },
    { id: 3, name: 'Tất cả' },
]

const Levels = computed(()=> {return store.state.Levels});
const ListClass = computed(() => { return store.state.Class ?? []; });
const Regions = computed(() => { return store.state.Regions ?? []; });
const Centers = computed(() => { return store.state.Centers ?? []; });

const changeRegions = function (value: [{ id: string, name: string }] | null) {
    console.log(value);
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
const changeView = function(value: { id: string, name: string }){
    console.log(value);
}
const updateDate = function(range:{start:Date,end:Date}){
    console.log(range);
}

onMounted(() => {
    store.dispatch('getRegions');
});

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
