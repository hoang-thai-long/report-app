<template>
  <div id="app" class="container">
    <table-report :user-type="'True' == 'True'" :teacher-id="'5d8389c2d5d1bf27e4410c04'" :center-code="'eduso'"></table-report>
    <!-- <check-point id="111" type="222"></check-point> -->
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
