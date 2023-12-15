<template>
  <div>
    <!-- số lượng học sinh hoạt động -->
    <Bar id="my-chart-id" :options="chartOptions" :data="data" />
    <!-- kết quả kiểm tra -->
    <p>{{ datasets }}</p>
    <!-- kiểm tra trung bình, trung vị -->
    <p>{{ labels }}</p>
    <!-- giao bài -->
  </div>
</template>
<script lang="ts">

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement)

import { Component, Vue } from "vue-property-decorator";
import { stack } from '@/utils/model';
@Component({
  components: { Bar },
  props: ['labels', 'datasets']
})

export default class ChartReport extends Vue {

  labels !: string[];
  datasets !: stack[];

  data = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [{
      label: 'My First Dataset',
      data: [{x: 'Sales', y: 10}, {x: 'Revenue', y: 5},{x: 'Sales', y: 20}, {x: 'Revenue', y: 5}],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  }

  chartData = {
    labels: this.labels,
    datasets: this.datasets
  }
  chartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  }
}

</script>