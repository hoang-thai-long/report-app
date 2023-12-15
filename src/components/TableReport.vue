<template>
    <div class="container">
        <filter-table :TeacherID="teacherId" :HeadTeacher="userType" :CenterCode="centerCode"></filter-table>
        <hr style="margin: 0 0 8px 0;"/>
        <table-view></table-view>
        <hr style="margin: 0 0 8px 0;">
        <chart-report></chart-report>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FilterTable from './FilterTable.vue';
import TableView from './TableView.vue';
import ChartReport from './ChartReport.vue';

@Component({
    name:'table-report',
    components: { FilterTable, TableView, ChartReport },
})
export default class TableReport extends Vue {
    @Prop()
    public teacherId !: string;
    @Prop()
    public userType !:boolean;
    @Prop()
    public centerCode !: string;
}
</script>