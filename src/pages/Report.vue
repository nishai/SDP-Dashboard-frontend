<template>
  <div >
    <Heading :heading_text="report.name"></Heading>
    <h3> {{ report.desc }} </h3>
    <div class="d-flex flex-wrap justify-content-start">
      <ReportChart style="width: 400px;" class="m-2" v-for="(chart, id) in report.charts" :key="id" :chartId="id" :chart="chart"></ReportChart>
      <div style="width: 400px;" class="d-flex justify-content-center">
        <b-button class="my-4 mx-2" style="height: 48px;" variant="outline-success" size="lg" @click="create"> New Chart </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '../components/misc/Heading.vue';
import ReportChart from '../components/reports/ReportChart.vue';

export default {
  name: 'Report',
  components: {
    Heading,
    ReportChart,
  },
  computed: {
    report_id() {
      return this.$route.params.id;
    },
    report() {
      return this.$store.state.reports.reports[this.report_id];
    },
  },
  methods: {
    create() {
      this.$store.dispatch('createReportChart', { reportId: this.report_id });
    },
  },
};
</script>

<style>
</style>
