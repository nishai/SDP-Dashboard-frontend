<template>
  <div align="center">
    <h6> {{ this.$props.chartData }} </h6>
    <h1 v-if="isData === false"> NO DATA FOUND FOR QUERY </h1>
    <!--component :is="component" ref="chart"></component-->
    <component :is="component" ref="chart"></component>
  </div>
</template>

<script>
import palette from 'google-palette';
import vueCharts from 'vue-chartjs';
import apiQuery from '../../../api/api_query';


const chartTypes = {
  'bar': vueCharts.Bar,
  'horizontalbar': vueCharts.HorizontalBar,
  'doughnut': vueCharts.Doughnut,
  'line': vueCharts.Line,
  'pie': vueCharts.Pie,
  'polar': vueCharts.PolarArea,
  'radar': vueCharts.Radar,
  'bubble': vueCharts.Bubble,
  'scatter': vueCharts.Scatter,
};

export default {
  name: 'Chart',
  props: ['chartData'],
  data: () => ({ 
    isData: false,
    chartResultsLabels: [],
    chartResultsData: [],
  }),

  computed: {
    component(){
      return chartTypes[this.$props.chartData[0].chartType];
    },
  },
  /**
   * run when component is created
   */
  mounted() {
    for (let i = 0; i < this.$props.chartData.length; i += 1) {
      console.log('Mounted!',
        this.$props.chartData[i].groupBy,
        this.$props.chartData[i].years,
        this.$props.chartData[i].faculties,
        this.$props.chartData[i].schools,
        this.$props.chartData[i].courses,
        this.$props.chartData[i].duplicate
      );
      this.getData(i);
    }
    // this.renderChart();
  },

  /**
   * Methods accessible to component
   */
  methods: {

    /**
     * Query for the data to render based on the current url parameters
     */
    getData(index) {
      console.log('LOADING DATA');
      // TODO: Multiple sub-charts
      apiQuery.getCourseStats(
        this.$props.chartData[index].groupBy,
        this.$props.chartData[index].years,
        this.$props.chartData[index].faculties,
        this.$props.chartData[index].schools,
        this.$props.chartData[index].courses,
        this.$props.chartData[index].duplicate
        ).then((response) => {
          const { results } = response.data;
          console.log('RESPONSE DATA:', response.data);
          if (response.data.results.length !== 0) {
            const keys = Object.keys(results[0]);
            const labels = [];
            const data = [];
            for (let j = 0; j < results.length; j += 1) { // TODO: add query parameter to perform this on the backend
              labels.push(results[j][keys[0]]);
              data.push(results[j][keys[1]]);
            }
            this.isData = true;
            this.chartResultsLabels.push(labels)
            this.chartResultsData.push(data);
            this.renderChart();
          }
        });
    },

    /**
     * Render the current loaded data to the chart component
     */
    renderChart() {
      if(this.chartResultsData.length === this.chartData.length){
        /*if (labels.length !== data.length) {
          throw new Error('Label length not equal to data length');
        }*/
        let datasets = [];
        let labels = [];
        for (let i = 0; i < this.$props.chartData.length; i += 1) {
            labels = [...new Set([...labels, ...this.chartResultsLabels[i]])];
            datasets.push({
              // label: this.chartResultsLabels[i],
              backgroundColor: palette('tol-rainbow', labels.length).map((color) => `#${color}`), // http://google.github.io/palette.js/
              data: this.chartResultsData[i],
              borderWidth: 2,
              type: this.$props.chartData[i].chartType,
              fill: false,
            });
        }
        this.$refs.chart.renderChart(
          {
            // type: this.chartType,
            labels: labels,
            datasets: datasets,
          },
          {
            responsive: true,
            maintainAspectRatio: false,
          },
        );
      }
    },
  }, /* >>> END METHODS <<< */
};
</script>

<style scoped>

</style>
