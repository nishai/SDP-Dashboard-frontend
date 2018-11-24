<template>
  <b-card class="report-card">

    <!-- HEADER -->
    <b-card-header>
      <template slot="title">
        <p class="title"> {{ name }} </p>
      </template>
      <template slot="icon">
        <button class="button is-danger is-outlined" @click="deleteChart">
          <b-icon icon="trash-alt" size="is-small"/>
        </button>
        <button class="button is-info is-outlined has-margin-left-sm" @click="editChart">
          <b-icon icon="edit" size="is-small"/>
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
import { getMapperLabelsValuesListToChartData, getMapperListToLabelsValues } from '../../assets/js/util/arrays.js';
import SlideoutChartOptions from '../slideout/SlideoutChartOptions.vue';

export default {
  name: 'DashboardChart',
  components: { SlideoutChartOptions },
  props: {
    reportId: { type: String, default: undefined },
    chartId: { type: String, default: undefined },
  },

  data() {
    return {
      chartData: undefined,
      chartOptions: {},
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
        && typeof this.chartData === 'object';
    },

    /* CHART DATA */
    chart() { return this.getReportChart(this.reportId, this.chartId); },
    name() { return this.chart ? this.chart.name : undefined; },
    meta() { return this.chart ? this.chart.meta : undefined; },
    chartType() { return this.meta ? this.meta.chartType : undefined; },
  },

  mounted() {
    this.refresh();
  },

  watch: {
    chart: {
      handler(value, valueOld) {
        this.refresh();
      },
      deep: true,
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

    editChart() {
      if (!this.chart) {
        return;
      }
      this.$emit('edit', this.reportId, this.chartId);
    },

    refresh() {
      console.log('Chart Refreshing:', this.chart);

      const { template, subsets } = this.chart.meta;

      // get a handler for the chartData that returns promises for each set of data for the chart.

      const handlers = {
        commonFilterChart: /* { type: 'commonFilterChart' } */
          () => subsets.map(
            ({ label, selected }, i) => template.getQueryset(selected)
              .thenStripPrefixes()
              .then(getMapperListToLabelsValues(template.fieldLabel, template.fieldData)),
          ),
      };

      if (!handlers[template.type]) {
        throw Error(`Unsupported Type: ${template.type}`);
      }

      const allPromises = handlers[template.type]();

      // Resolve promises for data.

      Promise.all(allPromises)
        .then(getMapperLabelsValuesListToChartData())
        .then((chartData) => {
          this.chartData = chartData;
        });
    },
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
