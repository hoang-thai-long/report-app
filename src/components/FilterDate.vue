<template>
    <div class="rt-filter-item">
        <!-- <button class="col btn btn-tab" @click="choisData('month')">Tháng</button> -->
        <!-- <button class="col btn btn-tab" @click="choisData('week')">Tuần</button> -->
        <date-range-picker @toggle="toggle" @update="updateValue" @start-selection="runLimit" v-model="dateRange" :auto-apply="true"></date-range-picker>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import { caculatorDate } from "../utils/common";

const emits = defineEmits(['on-update'])

const type = ref("week");


const now = ref(caculatorDate(new Date,type.value));
watch(type, (n, o) => {
    if(n != o){
        now.value = caculatorDate(new Date,type.value);
    }
})
const flag = ref(false);
const flagLastDate = ref(now.value.first);
const flagFirstDate = ref(now.value.last);

const dateRange = {
    startDate: now.value.first,
    endDate: now.value.last,
}

const toggle = function (data) {
    flag.value = !data;
}

const runLimit = function (value) {
    flag.value = true;
    const dateData = caculatorDate(value);
    dateRange.startDate = dateData.first;
    flagLastDate.value = dateData.last;
    flagFirstDate.value = dateData.first;
    dateRange.endDate = dateData.last;
}

const updateValue = function (value) { emits('on-update', value); }

</script>
<style>
.daterangepicker td.in-range {
    background-color: #ebf4f8 !important;
}

.daterangepicker td.active,
.daterangepicker td.active:hover {
    background-color: #357ebd !important;
    border-color: transparent;
    color: #fff;
}

.daterangepicker {
    min-width: none;
}
</style>