<template>
  <div class="small">
    <doughnut-chart :chart-data="datacollection"></doughnut-chart>
    <button @click="addData()">Superimpose</button>
  </div>
</template>

<script>
import DoughnutChart from './DoughnutChart';

export default {
  components: {
    DoughnutChart,
  },
  data() {
    return {
      datacollection: null,
    };
  },
  mounted() {
    const newData = {
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
      options: {
        title: {
          display: true,
          text: 'Course Demographics: Race',
        },
      },
    };
    this.startData(newData);
  },
  methods: {
    startData(newData) {
      this.datacollection = newData;
    },
    addData() {
      const newData = [{
        data: [55, 8, 12, 18, 7],
        backgroundColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
      }];
      this.datacollection = {
        title: this.datacollection.title,
        labels: this.datacollection.labels,
        datasets: this.datacollection.datasets.concat(newData),
        options: this.datacollection.options,
      };
    },
  },
};
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
