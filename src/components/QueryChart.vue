<template>
  <vue-chart
    :type="chartType"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { getMapperListToLabelsValues, getMapperLabelsValuesListToChartData } from '../assets/js/util/arrays';
import VueChart from './VueChart.vue';

export default {
  name: 'QueryChart',

  components: {
    VueChart,
  },

  props: {
    data: {
      type: Object,
      default() { return {}; },
    },
  },

  data() {
    return {
      chartOptions: {},
      chartData: {},
      loaded: false,
      failed: false,
    };
  },

  computed: {
    chartType() {
      return this.data.chartType;
    },
  },

  mounted() {
    // get a handler for the chartData that returns promises for each set of data for the chart.

    const handlers = {
      commonFilterChart: /* { type: 'commonFilterChart', chartType, labelField, dataField, getQueryset, filterSets } */
        () => this.data.filterSets.map(
          (filterData, i) => this.data.getQueryset(filterData)
            .thenStripPrefixes()
            .then(getMapperListToLabelsValues(this.data.labelField, this.data.dataField)),
        ),
    };

    if (!handlers[this.data.type]) {
      this.failed = true;
      throw Error(`Unsupported Type: ${this.data.type}`);
    }

    const allPromises = handlers[this.data.type]();

    // Resolve promises for data.

    Promise.all(allPromises)
      .then(getMapperLabelsValuesListToChartData())
      .then((chartData) => {
        this.chartData = chartData;
        console.log('Loaded All', chartData);
        this.loaded = true;
      })
      .catch((error) => {
        console.log('Unable to load chart data');
        this.failed = true;
      });
  },
};
</script>

<style scoped>
</style>
