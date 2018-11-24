<template>
  <!-- CREATE NEW FROM TEMPLATE -->
  <v-slideout v-if="!editor"
    :active.sync="templatesActive"
    :active-extra.sync="optionsActive"
    width="600px" width-pane="200px" width-pane-extra="400px"
    disable-parents
  >
    <!-- TEMPLATE -->
    <DashboardChartOptionsTemplates
      :categories="templateCategories"
      @input="(item) => { selectedTemplate=item; optionsActive=true; }"
      singles
    />
    <!-- OPTIONS -->
    <div slot="extra" class="content has-padding-md">
      <DashboardChartOptions
        :name.sync="selectedName"
        :type.sync="selectedChartType"
        :template="selectedTemplate"
        :subsets="selectedSubsets"
      />
      <b-level>
        <b-field slot="left" grouped>
          <p class="control button is-danger is-outlined" @click="optionsActive=false"> Back </p>
          <p class="control button is-success" @click="close"> Create </p>
        </b-field>
      </b-level>
    </div>
  </v-slideout>
  <!-- EDIT ONLY, NO TEMPLATES -->
  <v-slideout v-else
    :active.sync="optionsActive"
    width="400px" width-pane="400px" width-pane-extra="0"
    disable-parents
  >
    <!-- OPTIONS -->
    <div class="content has-padding-md">
      <DashboardChartOptions
        :name.sync="selectedName"
        :type.sync="selectedChartType"
        :template="selectedTemplate"
        :subsets="selectedSubsets"
      />
      <b-level>
        <b-field slot="left" grouped>
          <p class="control button is-success" @click="close"> Modify </p>
        </b-field>
      </b-level>
    </div>
  </v-slideout>
</template>

<script>
import { mapGetters } from 'vuex';
import { getDefaultTemplateListItems } from '../../assets/js/defaults';
import DashboardChartOptions from '../dashboard/DashboardChartOptions.vue';
import DashboardChartOptionsTemplates from '../dashboard/DashboardChartOptionsTemplates.vue';
import DisplayOrError from '../DisplayOrError.vue';


export default {
  name: 'SlideoutChartOptions',
  components: { DisplayOrError, DashboardChartOptionsTemplates, DashboardChartOptions },

  data() {
    return {
      /* link */
      reportId: undefined,
      chartId: undefined,
      /* promise */
      promiseAccept: undefined,
      promiseReject: undefined,
      /* open sidebar */
      optionsActive: false,
      templatesActive: false,
      /* template categories */
      templateCategories: getDefaultTemplateListItems(),
      /* selection */
      selectedTemplate: undefined,
      selectedSubsets: undefined,
      selectedName: undefined,
      selectedChartType: undefined,
    };
  },

  computed: {
    ...mapGetters(['hasReport', 'hasReportChart', 'getReport', 'getReportChart']),

    reportValid() {
      return !!this.hasReport(this.reportId);
    },
    chartValid() {
      return !!this.hasReportChart(this.reportId, this.chartId);
    },
    valid() {
      return this.reportValid && this.chartValid;
    },

    chart() {
      return this.getReportChart(this.reportId, this.chartId);
    },
    editor() {
      return !!(this.valid
        && this.chart.meta
        && this.chart.meta.template
        && this.chart.meta.template.type);
    },
    isOpen() {
      return this.optionsActive || this.templatesActive;
    },
  },

  methods: {

    open(reportId, chartId) {
      if (this.isOpen) {
        throw new Error('Editor already open');
      }

      this.reportId = reportId;
      this.chartId = chartId;

      this.selectedTemplate = this.valid ? this.chart.meta.template : {};
      this.selectedSubsets = this.valid ? this.chart.meta.subsets : [];
      this.selectedName = this.valid ? this.chart.name : undefined;
      this.selectedChartType = this.valid ? this.chart.meta.chartType : undefined;

      console.log('NAME', this.selectedName);

      this.optionsActive = this.editor;
      this.templatesActive = !this.editor;

      return new Promise((accept, reject) => {
        this.promiseAccept = accept;
        this.promiseReject = reject;
      });
    },

    close() {
      if (!this.isOpen) {
        throw new Error('Editor already closed');
      }

      const meta = {
        template: this.selectedTemplate,
        subsets: this.selectedSubsets,
        chartType: this.selectedChartType,
      };
      const name = this.selectedName || meta.template.desc || undefined;

      console.log('closing editor', name, meta);

      this.reportId = undefined;
      this.chartId = undefined;

      this.selectedSubsets = undefined;
      this.selectedTemplate = undefined;
      this.selectedName = undefined;
      this.selectedChartType = undefined;

      this.optionsActive = false;
      this.templatesActive = false;

      this.promiseAccept({ name, meta });
    },
  },
};
</script>

<style scoped>

</style>
