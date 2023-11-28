<template>
  <div id="app">
    <table-report></table-report>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TableReport from './components/TableReport.vue';
@Component({
  components: {
    TableReport,
  },
})
export default class App extends Vue {}
</script>
