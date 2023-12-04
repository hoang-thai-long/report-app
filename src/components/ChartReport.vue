<template>
    <div>
        <canvas :id="id"></canvas>
    </div>
</template>
<script lang="ts" setup>
import Chart from 'chart.js/auto';
// import { getRelativePosition } from 'chart.js/helpers';
import { ref, defineProps} from 'vue';

const props = defineProps({
    id:String
});

const id = ref<string>(props.id ?? 'report-table-chart');

// const labels = Utils.months({count: 7});
const data : any = {
  labels: "test",
  datasets: [{
    axis: 'y',
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
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
};

const ctx = document.getElementById(id.value);
if(ctx instanceof HTMLCanvasElement){
new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    }}
);
}


</script>