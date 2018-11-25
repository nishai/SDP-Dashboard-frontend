<template>
  <b-card class="report-card h-expander">

    <!-- HEADER -->
    <b-card-header>
      <template slot="title">
        <p class="title is-4"> {{ name }} </p>
      </template>
      <template slot="icon">
        <button class="button is-danger is-outlined" @click="deleteChart">
          <b-icon icon="trash-alt" size="is-small"/>
        </button>
        <button class="button is-info is-outlined has-margin-left-sm" @click="copyChart">
          <b-icon icon="copy" size="is-small"/>
        </button>
        <button class="button is-warning is-outlined has-margin-left-sm" @click="editChart">
          <b-icon icon="pen" size="is-small"/>
        </button>
        <div class="button is-bulma has-margin-left-sm" :class="[showRawData ? '' : 'is-outlined']" @click="showRawData=!showRawData">
          <b-icon :icon="showRawData?chartTypeInfo.icon:'list'" :pack="showRawData?chartTypeInfo.iconPack:undefined"/>
        </div>
      </template>
    </b-card-header>

    <!-- CARD -->
    <b-card-content class="has-text-centered h-expand">
      <!-- CHART -->
      <v-chart
        class="h-expanded no-min"
        v-if="isValid && !showRawData"
        :type="chartType"
        :options="chartOptions"
        :data="chartDataCopy"
      />

      <!-- RAW DATA -->
      <div v-if="isValid && showRawData" class="chart-data-container">
        <b-table :data="chartDataCopy.datasets" paginated per-page="5" detailed striped hoverable class="chart-datasets-table">
          <template slot-scope="props">
            <b-table-column label="Index" width="50"> # {{ props.index + 1 }} </b-table-column>
            <b-table-column label="Dataset"> {{ props.row.label }} </b-table-column>
          </template>
          <template slot="detail" slot-scope="props">
            <b-table :data="props.row.data" paginated per-page="5" striped hoverable class="chart-dataset-table">
              <template slot-scope="dat">
                <b-table-column label="Index" width="50"> # {{ dat.index + 1 }} </b-table-column>
                <b-table-column label="Label"> {{ chartData.labels[dat.index] }} </b-table-column>
                <b-table-column label="Data"> {{ dat.row }} </b-table-column>
              </template>
            </b-table>
          </template>
        </b-table>
      </div>

      <!-- ERROR -->
      <div v-if="!isValid" class="content has-text-grey has-text-centered">
        <p><b-icon icon="sad-tear" pack="far" size="is-large"/></p>
        <p> The chart is invalid. We apologise for the inconvenience. </p>
      </div>

      <!-- LOADING -->
      <b-loading :is-full-page="false" :active="isLoading && !isValid"/>
    </b-card-content>

  </b-card>
</template>

<script>
import clonedeep from 'lodash.clonedeep';
import BTable from 'buefy/src/components/table/Table.vue';
import { mapGetters } from 'vuex';
import { getDefaultChartInfo } from '../../assets/js/defaults';
import { CHART_TEMPLATES, getDefaultChartTooltipCallbacks } from '../../assets/js/templates';
import {
  getMapperLabelsValuesListToChartData,
  getMapperListToLabelsValues,
  getMapperColorizeChartData,
} from '../../assets/js/util/arrays';
import SlideoutChartOptions from '../slideout/SlideoutChartOptions.vue';


const chartTypeInfo = getDefaultChartInfo();


export default {
  name: 'DashboardChart',
  components: { BTable, SlideoutChartOptions },
  props: {
    reportId: { type: String, default: undefined },
    chartId: { type: String, default: undefined },
  },

  data() {
    return {
      chartData: undefined,
      chartOptions: {},

      showRawData: false,
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
    chartTypeInfo() { return this.chartType ? chartTypeInfo[this.chartType] : {}; },

    chartDataCopy() {
      return clonedeep(this.chartData);
    },
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

    copyChart() {
      if (!this.chart) {
        return;
      }
      this.$store.dispatch('copyReportChart', { reportId: this.reportId, chartId: this.chartId })
        .then((result) => {
          console.log('COPIED', result);
        });
    },

    editChart() {
      if (!this.chart) {
        return;
      }
      this.$emit('edit', this.reportId, this.chartId);
    },

    // TODO: This needs to be cleaned up.
    refresh() {
      const template = CHART_TEMPLATES[this.chart.meta.template];
      const { subsets } = this.chart.meta;

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
      const colors = template.colors || {};
      const labels = template.labels || {};

      this.chartOptions.tooltips = {
        callbacks: getDefaultChartTooltipCallbacks({
          postfix: labels.postfix || '',
          rounding: labels.rounding || false,
          percent: labels.percent || false,
        }),
      };

      // Resolve promises for data.

      Promise.all(allPromises)
        .then(getMapperLabelsValuesListToChartData(subsets.map((subset) => subset.label)))
        .then(getMapperColorizeChartData({
          colorPalette: colors.palette || 'tol-rainbow',
          datasetNotLabels: colors.datasetNotLabels || false,
          shade: colors.shaded || true,
          borders: colors.borders || false,
        }))
        .then((chartData) => {
          this.chartData = chartData;
          console.log('CHART DATA', this.chartData);
        });
    },
  },
};
</script>

<style scoped lang="scss">

.report-card:hover button,
.report-card:hover div.button.is-outlined {
  opacity: 1;
}

.report-card button,
.report-card div.button.is-outlined {
  opacity: 0;
  background-color: whitesmoke;
}

.chart-data-container {
  overflow-y: scroll;
}

.chart-datasets-table {}
.chart-dataset-table {}

/deep/ .chart-dataset-table td {
  padding-bottom: 0.125rem;
  padding-top: 0.125rem;
}

/deep/ .detail {
  padding: 0;
  background-color: white;
}

/deep/ .chart-dataset-table .charttd,
/deep/ .chart-dataset-table .level,
/deep/ div.detail-container {
  padding: 0;
}

/deep/ .chart-dataset-table .table-wrapper {
  margin: 0;
}

</style>
