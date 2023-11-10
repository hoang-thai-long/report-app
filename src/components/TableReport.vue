<template>
    <div class="container">
        <div class="row">
            <filter-table></filter-table>
            <table-view></table-view>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilterTable from './FilterTable.vue';
import TableView from './TableView.vue';

@Component({
    components: { FilterTable, TableView }
})
export default class TableReport extends Vue {

}
</script>