<template>
  <component :is="component" ref="chart"></component>
</template>

<script>
import palette from 'google-palette';
import vueCharts from 'vue-chartjs';
import apiQuery from '../api/api_query';


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
  name: 'ChartTemplate',

  data: () => ({}),

  /**
   * Common variables
   */
  computed: {
    /* chart */
    chartType() {
      return this.$route.query.chartType;
    },
    component() {
      if (!(this.chartType in chartTypes)) {
        throw new Error(`Chart type "${this.chartType}" does not exist.`);
      }
      return chartTypes[this.chartType];
    },
    /* params */
    groupBy() {
      return this.$route.query.groupBy;
    },
    years() {
      return this.$route.query.years;
    },
    faculties() {
      return this.$route.query.faculties;
    },
    schools() {
      return this.$route.query.schools;
    },
    courses() {
      return this.$route.query.courses;
    },
  }, /* >>> END COMPUTED <<< */

  /**
   * run when component is created
   */
  mounted() {
    console.log('Mounted!', this.groupBy, this.years, this.faculties, this.schools, this.courses);
    this.getData();
    // this.renderChart();
  },

  /**
   * Methods accessible to component
   */
  methods: {

    /**
     * Query for the data to render based on the current url parameters
     */
    getData() {
      console.log('LOADING DATA');
      // TODO: Multiple sub-charts
      apiQuery.getCourseStats(this.groupBy, this.years, this.faculties, this.schools, this.courses)
        .then((response) => {
          const { results } = response.data;
          console.log('RESPONSE DATA:', response.data);
          const keys = Object.keys(results[0]);
          const labels = [];
          const data = [];
          for (let j = 0; j < results.length; j += 1) { // TODO: add query parameter to perform this on the backend
            labels.push(results[j][keys[0]]);
            data.push(results[j][keys[1]]);
          }
          this.renderChart(labels, data);
        });
    },

    /**
     * Render the current loaded data to the chart component
     */
    renderChart(labels, data) {
      if (labels.length !== data.length) {
        throw new Error('Label length not equal to data length');
      }

      this.$refs.chart.renderChart(
        {
          labels,
          datasets: [
            {
              label: this.groupBy,
              backgroundColor: palette('mpn65', labels.length).map((color) => `#${color}`), // http://google.github.io/palette.js/
              data,
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
        },
      );
    },
  }, /* >>> END METHODS <<< */
};
</script>

<style scoped>

</style>
