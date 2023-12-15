<template>
  <div>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>
<script lang="ts">

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

import { Component, Vue, Ref } from "vue-property-decorator";

@Component({
  components: { Bar }
})

export default class ChartReport extends Vue {
  @Ref() chartData = {
    labels: ['January', 'February', 'March'],
    datasets: [{ data: [40, 20, 12] }]
  }
  @Ref() chartOptions = {
    responsive: true
  }


  public data = [30, 40, 60, 70, 5];
  public legendTop = true;
}

</script>