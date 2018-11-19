<template>
  <div>
    <b-modal ref="popupRef" id="popup" title="Chart Options" size="lg" hide-footer>
      <h1> {{ title }} </h1>
      <b-container fluid>
        <FilterForm
          ref="filterForm"
          :groupByDesc="title"
          :chartTypeOptions="opts.chartTypeOptions"
          :ftype="opts.ftype"
          :fyear="opts.fyear"
          :fcourse="opts.fcourse"
          :ffaculty="opts.ffaculty"
          :fschool="opts.fschool"
          :numForms="opts.numForms"
          :selectedChartType="opts.chartType"
          :compare="opts.compare"
        />
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import FilterForm from './FilterForm.vue';

export default {
  name: 'FilterFormModal',
  props: {
    title: { type: String, default: 'Unnamed Modal' },
    options: { type: Object, default() { return {}; } },
  },
  components: {
    FilterForm,
  },
  computed: {
    opts() {
      return Object.assign({
        chartTypeOptions: [['bar']],
        ftype: true,
        fyear: true,
        fcourse: true,
        ffaculty: true,
        fschool: true,
        numForms: 1,
        compare: false,
      }, this.options || {});
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

