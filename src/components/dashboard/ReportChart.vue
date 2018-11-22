<template>
  <b-card class="report-card">

    <!-- HEADER -->
    <b-card-header>
      <template slot="title">
        <b-input v-model="name"></b-input>
      </template>
      <template slot="icon">
        <button class="button is-danger is-outlined" @click="deleteChart">
          <b-icon icon="trash-alt" size="is-small"/>
        </button>
      </template>
    </b-card-header>

    <!-- CHART -->
    <b-card-content class="has-text-centered">
      <!-- VALID -->
      <v-chart
        v-if="isValid"
        :type="chartType"
        :options="chartOptions"
        :data="chartData"
      />
      <!-- ERROR -->
      <div v-else class="content has-text-grey has-text-centered">
        <p><b-icon icon="sad-tear" pack="far" size="is-large"/></p>
        <p> The chart is invalid. We apologise for the inconvenience. </p>
      </div>
      <!-- LOADING -->
      <b-loading :is-full-page="false" :active="isLoading && !isValid"/>
    </b-card-content>

  </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { getMapperLabelsValuesListToChartData, getMapperListToLabelsValues } from '../../assets/js/util/arrays';

// import { getMapperListToLabelsValues, getMapperLabelsValuesListToChartData } from '../../assets/js/util/arrays';

export default {
  name: 'ReportChart',

  props: {
    reportId: { type: String, default: undefined },
    chartId: { type: String, default: undefined },
  },

  data() {
    return {
      chartData: {},
      chartOptions: {},
      chartType: undefined,
    };
  },

  computed: {
    ...mapGetters(['getReport', 'hasReport', 'getReportChart', 'hasReportChart']),

    isLoading() {
      return false;
    },
    isValid() {
      return this.hasReport(this.reportId)
        && this.hasReportChart(this.reportId, this.chartId)
        && typeof this.chartOptions === 'object'
        && typeof this.chartData === 'object'
        && typeof this.chartType === 'string';
    },

    chart() {
      return this.getReportChart(this.reportId, this.chartId);
    },
    name: {
      get() {
        return this.chart.name;
      },
      set(name) {
        this.$store.dispatch('renameReportChart', { reportId: this.reportId, chartId: this.chartId, name });
      },
    },
    meta() {
      return this.chart.meta;
    },
  },

  methods: {
    deleteChart() {
      if (!this.chart) {
        return;
      }
      this.$store.dispatch('deleteReportChart', { reportId: this.reportId, chartId: this.chartId });
      this.$toast.open({ duration: 1000, type: 'is-danger', message: 'Deleted Chart!' });
    },
  },

  mounted() {
    console.log("MOUNTED CHART:", this.chart);

    const meta = this.chart.meta;
    const data = this.chart.meta.data;

    // get a handler for the chartData that returns promises for each set of data for the chart.

    const handlers = {
      commonFilterChart: /* { type: 'commonFilterChart', chartType, labelField, dataField, getQueryset, filterSets } */
        () => meta.filters.map(
          (filterData, i) => data.getQueryset(filterData)
            .thenStripPrefixes()
            .then(getMapperListToLabelsValues(data.labelField, data.dataField)),
        ),
    };

    if (!handlers[data.dataType]) {
      this.failed = true;
      throw Error(`Unsupported Type: ${data.dataType}`);
    }

    this.chartType = meta.chartType;

    const allPromises = handlers[data.dataType]();

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

<style scoped lang="scss">

.report-card:hover button {
  opacity: 1;
}

.report-card button {
  opacity: 0;
  background-color: whitesmoke;
}

</style>
