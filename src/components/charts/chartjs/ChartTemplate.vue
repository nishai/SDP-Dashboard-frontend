<template>
  <div align="center">
    <h2> {{ groupBy }} </h2>
    <h4> {{ faculties }}/{{ schools }} {{ years }} </h4>
    <h6> {{ courses }} </h6>
    <h1 v-if="isData === false"> NO DATA FOUND FOR QUERY </h1>
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
  name: 'ChartTemplate',
  props: ['chart'],
  data: () => ({ isData: false }),

  /**
   * Common variables
   */
  computed: {
    /* chart */
    chartType() {
      return this.$props.chart.chartType;
    },
    component() {
      if (!(this.chartType in chartTypes)) {
        throw new Error(`Chart type "${this.chartType}" does not exist.`);
      }
      return chartTypes[this.chartType];
    },
    /* params */
    groupBy() {
      return this.$props.chart.groupBy;
    },
    years() {
      return this.$props.chart.years;
    },
    faculties() {
      return this.$props.chart.faculties;
    },
    schools() {
      return this.$props.chart.schools;
    },
    courses() {
      return this.$props.chart.courses;
    },
    duplicate() {
      return this.$props.chart.duplicate;
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
      apiQuery.getCourseStats(this.groupBy, this.years, this.faculties, this.schools, this.courses, this.duplicate)
        .then((response) => {
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
            this.renderChart(labels, data);
          }
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
          type: this.chartType,
          labels,
          datasets: [
            {
              label: this.groupBy,
              backgroundColor: palette('tol-rainbow', labels.length).map((color) => `#${color}`), // http://google.github.io/palette.js/
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
