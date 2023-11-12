<template>
    <div class="filter-item">
        <button class="btn btn-tab" @click="choisData('month')">Tháng</button>
        <button class="btn btn-tab" @click="choisData('week')">Tuần</button>
        <date-range-picker @toggle="toggle" @update="updateValue" @start-selection="runLimit" v-model="dateRange"
            :date-format="dateFormat" :auto-apply="true"></date-range-picker>
    </div>
</template>
<script setup>
import { defineEmits, ref, watch } from 'vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

const emits = defineEmits(['on-update'])

const type = ref("week");



const caculatorDate = function (date) {
    if (!date) {
        date = new Date()
    }
    const month = date.getMonth();
    const year = date.getFullYear();
    if (type.value == "month") {
        const thisMonth = month < 12 ? new Date(year, month, 1) : new Date(year + 1, 1, 1);
        const nextMonth = month < 11 ? new Date(year, month + 1, 1) : new Date(year + 1, 1, 1);
        const lastMonth = new Date(nextMonth.setDate(-1));

        return {
            first: thisMonth,
            last: lastMonth
        }
    }
    else {
        const week = [1, 2, 3, 4, 5, 6, 0];
        const dateIndex = date.getDay();
        const clone = new Date(date.getTime());
        const cloneDate = clone.getDate();

        const firstWeek = new Date(clone.setDate(cloneDate - week.indexOf(dateIndex)));
        const cloneFirstWeek = new Date(firstWeek.getTime());
        const lastWeek = new Date(cloneFirstWeek.setDate(cloneFirstWeek.getDate() + 6));
        return {
            first: firstWeek,
            last: lastWeek
        }
    }

}

const now = ref(caculatorDate(new Date));
watch(type, (n, o) => {
    if(n != o){
        now.value = caculatorDate(new Date);
    }
})
const flag = ref(false);
const flagLastDate = ref(now.value.first);
const flagFirstDate = ref(now.value.last);

const dateRange = {
    startDate: now.value.first,
    endDate: now.value.last,
}

const choisData = function(value){
    if(type.value != value){
        type.value = value;
        now.value = caculatorDate(new Date);
        flagLastDate.value = now.value.last;
        flagFirstDate.value = now.value.first;
        dateRange.startDate =  now.value.first;
        dateRange.endDate = now.value.last;
    }
    console.log(dateRange)
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



const dateFormat = function (classes, date) {
    if (!classes.disabled && flag.value) {
        classes.disabled = date.getTime() > flagLastDate.value || date.getTime() < flagFirstDate.value
    }
    return classes
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

.daterangepicker .ranges {
    display: none;
}

.daterangepicker {
    min-width: none;
}
</style>