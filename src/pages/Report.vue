<template>
  <div ref="reportPage">
    <Heading :heading_text="report.name"></Heading>
    <h3> {{ report.desc }} </h3>
    <b-button class="btn btn-info" @click="doPDF">Save report</b-button>
    <div class="d-flex flex-wrap justify-content-start">
      <ReportChart ref="single_report" style="width: 400px;" class="m-2" v-for="(chart, id) in report.charts" :key="id" :chartId="id" :chart="chart"></ReportChart>
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
import html2canvas from 'html2canvas';

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
    doPDF() {
      // var ratio = this.$refs.reportPage.clientHeight / this.$refs.reportPage.clientWidth;
      // var doc = new jsPDF();
      // var width = doc.internal.pageSize.getWidth(); 
      // var height = doc.internal.pageSize.getHeight(); 
      // height = ratio * width;

      // for (var chart in this.$store.state.reports.reports[this.reportId]){
      //   html2canvas(chart)
      //   .then(canvas => {  
      //     var imgData = canvas.toDataURL('image/png');              
      //     doc.addImage(imgData, 'PNG', 0, 0, 0, 0, '', 'FAST');
      //   });
      // }

      // doc.save('report.pdf');

      console.log(this.report.charts);
    },
  },
};
</script>

<style>
</style>
