<template>
  <div>
    <b-modal ref="popupRef" id="popup" title="Chart Options" size="lg" hide-footer>
      <b-container fluid>
        <FilterForm
          ref="filterForm"
          v-bind:chartTypeOptions="options.chartTypeOptions"
          v-bind:ftype="options.ftype"
          v-bind:groupByDesc="options.groupByDesc"
          v-bind:fyear="options.fyear"
          v-bind:fcourse="options.fcourse"
          v-bind:ffaculty="options.ffaculty"
          v-bind:fschool="options.fschool"
          v-bind:numForms="options.numForms"
          v-bind:selectedChartType="chartType"
          v-bind:compare="options.compare"
        />
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import FilterForm from './FilterForm.vue';


function getItems() {
  return {
    'Race': {
      chartTypeOptions: [['doughnut']], ftype: true, fyear: true, fcourse: true, ffaculty: true, fschool: true, numForms: 1, compare: false,
    },
    'Gender': {
      chartTypeOptions: [['pie']],  ftype: true, fyear: true, fcourse: true, ffaculty: true, fschool: true, numForms: 1, compare: false,
    },
    'Nationality': {
      chartTypeOptions: [['pie']],  ftype: true, fyear: true, fcourse: true, ffaculty: true, fschool: true, numForms: 1, compare: false,
    },
    'Home Language': {
      chartTypeOptions: [['pie']],  ftype: true, fyear: true, fcourse: true, ffaculty: true, fschool: true, numForms: 1, compare: false,
    },
    'Demographics vs Marks': {
      chartTypeOptions: [['line']], ftype: true, fyear: true, fcourse: true, ffaculty: true, fschool: true, numForms: 2, compare: false,
    },
    'Pass rates by year': {
      chartTypeOptions: [['bar']],  ftype: true, fyear: true, fcourse: true, ffaculty: true, fschool: true, numForms: 1, compare: false,
    },
    'Pass rates by faculty/course': {
      chartTypeOptions: [['bar']],  ftype: true, fyear: true, fcourse: true, ffaculty: true, fschool: true, numForms: 1, compare: false,
    },
    'Bell curve': {
      chartTypeOptions: [['line']], ftype: true, fyear: true, fcourse: true, ffaculty: true, fschool: true, numForms: 1, compare: false,
    },
    'Progress Outcome by faculty/course': {
      chartTypeOptions: [['bar']],  ftype: true, fyear: true, fcourse: true, ffaculty: true, fschool: true, numForms: 1, compare: false,
    },
    'Class size vs pass rate': {
      chartTypeOptions: [['line']], ftype: true, fyear: true, fcourse: true, ffaculty: true, fschool: true, numForms: 2, compare: false,
    },
    'Average class size by faculty/course': {
      chartTypeOptions: [['bar']],  ftype: true, fyear: true, fcourse: true, ffaculty: true, fschool: true, numForms: 1, compare: false,
    },
  };
}

export default {
  name: 'FilterFormModal',
  props: {
    chartType: { type: String, default: undefined },
    groupByDesc: { type: String, default: undefined },
  },
  components: {
    FilterForm,
  },
  computed: {
    options() {
      const item = getItems()[this.groupByDesc];
      if (!item) {
        throw Error(`Chart type not found: ${this.groupByDesc}`);
      }
      return item;
    },
  },
  methods: {
    showModal() {
      this.$refs.popupRef.show();
      this.$refs.filterForm.loadData();
    },
    hideModal() {
      this.$refs.popupRef.hide();
    },
  },
};
</script>

<style>
</style>

