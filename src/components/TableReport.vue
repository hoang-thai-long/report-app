<template>
    <div class="container-fluid">
        <filter-table :TeacherID="teacherId" :HeadTeacher="userType" :CenterCode="centerCode"></filter-table>
        <table-view></table-view>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FilterTable from './FilterTable.vue';
import TableView from './TableView.vue';

@Component({
    name:'table-report',
    components: { FilterTable, TableView },
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