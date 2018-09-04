/* eslint-disable */
<template>
    <div id="chart_div">
        <canvas id="chart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'Chart',
  data() {
    return {
      chart_data: {
        type: 'doughnut',
        data: {
          title: 'Race',
          labels: ['Black', 'White', 'Indian', 'Coloured', 'Other'],
          datasets: [{
            data: [60, 13, 12, 10, 5],
            backgroundColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 2,
          }],
        },
        options: {
          title: {
            display: true,
            text: 'Course Demographics: Race',
          },
        },
      },
    };
  },
  mounted() {
    const ctx = 'chart';
    const chart = new Chart(ctx, this.chart_data);
  },
};
</script>

<style>
/* #chart_div { */
    /* margin-left: 200px;
    width: calc(100% - 200px);
    height: 100%;
    border: 1px solid black; */
/* } */
/* #chart { */
    /* width: 400px; */
    /* border: 1px solid red; */
/* } */
</style>
