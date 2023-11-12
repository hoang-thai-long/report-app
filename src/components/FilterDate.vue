<template>
    <date-range-picker v-model="dateRange" :date-format="dateFormat" single-date-picker="range" :auto-apply="true"></date-range-picker>
</template>
<script setup>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

const dateRange = {
    startDate: '2019-12-26',
    endDate: '2019-12-28',
}

const dateFormat= function(classes, date) {
    if (!classes.disabled) {
        classes.disabled = date.getTime() < new Date()
    }
    return classes
}

</script>