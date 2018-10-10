<template>
  <div ref="reportPage">
    <Heading :heading_text="report.name"></Heading>
    <h3> {{ report.desc }} </h3>
    <b-button class="btn btn-info" @click="doPrint">Print report</b-button>
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
import jsPDF from 'jspdf';

export default {
  name: 'Report',
  components: {
    Heading,
    ReportChart,
  },
  computed: {
    reportId() {
      return this.$route.params.id;
    },
    report() {
      return this.$store.state.reports.reports[this.reportId];
    },
  },
  methods: {
    create() {
      this.$store.dispatch('createReportChart', { reportId: this.reportId });
    },
    doPrint() {
      const doc = new jsPDF();
      const specialElementHandlers = {
        '#editor': function (element, renderer) {
          return true;
        },
      };

      doc.fromHTML(this.$refs.reportPage[0], 15, 15, {
        width: 170, elementHandlers: specialElementHandlers,
      });
      doc.save('report.pdf');
    },
  },
};
</script>

<style>
</style>
