/* eslint-disable */
<template>
  <div>
    <doughnut-chart v-if="type === 'doughnut'" :chart-data="datacollection"></doughnut-chart>
    <line-chart v-else-if="type === 'line'" :chart-data="datacollection"></line-chart>
    <bar-chart v-else-if="type === 'bar'" :chart-data="datacollection"></bar-chart>
    <pie-chart v-else-if="type === 'pie'" :chart-data="datacollection"></pie-chart>
    <radar-chart v-else-if="type === 'radar'" :chart-data="datacollection"></radar-chart>
    <polar-chart v-else-if="type === 'polar'" :chart-data="datacollection"></polar-chart>
    <bubble-chart v-else-if="type === 'bubble'" :chart-data="datacollection"></bubble-chart>
    <scatter-chart v-else-if="type === 'scatter'" :chart-data="datacollection"></scatter-chart>
    <button @click="addData()">Compare</button>
  </div>
</template>

<script>
import DoughnutChart from './DoughnutChart';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import RadarChart from './RadarChart';
import PolarChart from './PolarChart';
import BubbleChart from './BubbleChart';
import ScatterChart from './ScatterChart';

export default {
  components: {
    DoughnutChart,
    LineChart,
    BarChart,
    PieChart,
    RadarChart,
    PolarChart,
    BubbleChart,
    ScatterChart,
  },
  props: [
    'type',
    'chartData',
  ],
  data() {
    return {
      datacollection: null,
    };
  },
  mounted() {
    console.log("yyyyyyyyyyyyyyyyyyyyyyyyy ")
    console.log(this.$props.chartData)
    let newData = {
      title: 'Race',
      labels: ['Black', 'White', 'Indian', 'Coloured', 'Other'],
      datasets: [{
        data: [],
        backgroundColor: [
//          'rgba(255,99,132,1)',
//          'rgba(54, 162, 235, 1)',
//          'rgba(255, 206, 86, 1)',
//          'rgba(75, 192, 192, 1)',
//          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      }],
      options: {
        title: {
          display: true,
          text: this.$props.type,
        },
      },
    };
    for (let i = 0; i < this.$props.chartData.length; i += 1) {
      let bgColor = [];
      for (let j = 0; j < this.$props.chartData.length; j += 1) {
        bgColor.push(
          'rgba(' +
          (Math.floor(Math.random() * 256)) +
          ',' +
          (Math.floor(Math.random() * 256)) +
          ',' +
          (Math.floor(Math.random() * 256)) +
          ',' +
          1 +
          ')',
        );
      }
      newData.datasets.concat([{
        data: this.$props.chartData[i],
        backgroundColor: bgColor,
      }]);
    }
    this.datacollection = newData;
    // this.startData(newData);
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
</style>
