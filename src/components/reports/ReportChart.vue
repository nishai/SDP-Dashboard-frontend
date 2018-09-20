<template>
  <div>

    <!-- Modal Component -->
    <b-modal ref="myModalRef" id="modal1" title="Bootstrap-Vue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>

    <b-card no-body>
      <!-- Heading -->
      <div slot="header" class="d-flex justify-content-between">
        <h4 class="mb-1"> {{ chart.name }} </h4>
        <small class="d-flex justify-content-between">
          <b-btn size="sm" class="m-1" variant="outline-primary" @click="openPopup">Edit</b-btn>
          <!--<b-btn size="sm" variant="outline-primary" @click="toggleEditor">Opts</b-btn>-->
          <b-btn size="sm" class="m-1" variant="outline-danger" @click="deletePrompt">Delete</b-btn>
          <!--<b-btn v-b-modal.modal1>Launch demo modal</b-btn>-->
          <!--<FeatherIcon name="trash" class="mr-2" @click="openPopup"></FeatherIcon>-->
          <!--<FeatherIcon name="edit-2" @click="openPopup"></FeatherIcon>-->
        </small>
      </div>
      <!-- Chart -->
      <b-card-body style="padding: 5px;">
        <Chart :type="chart.type"></Chart>
      </b-card-body>
      <!-- Info -->
      <b-card-footer> {{ details }} </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import Chart from '../charts/chartjs/Chart.vue';
// import ReportChartEdit from '../reports/ReportChartEdit.vue';
import FeatherIcon from '../misc/FeatherIcon.vue';

export default {
  name: 'ReportChart',
  props: {
    chartId: {
      type: String,
    },
    chart: {
      type: Object,
    },
  },
  components: {
    Chart,
    FeatherIcon,
  },
  data: () => ({
    optsbarComponentPrivate: null,
    showPopup: false,
  }),
  // created() {
  //   this.optsbarComponentPrivate = new ReportChartEdit({
  //     propsData: {
  //       reportId: this.reportId,
  //       chartId: this.chartId,
  //     },
  //   });
  // },
  computed: {
    reportId() {
      return this.$route.params.id;
    },
    report() {
      return this.$store.state.reports.reports[this.reportId];
    },
    details() {
      return 'TODO: detials';
    },
    isEditorOpen() {
      return this.$store.state.ui.optsbarOpen
        && this.optsbarComponent
        && this.$store.state.ui.optsbarComponent === this.optsbarComponent;
    },
  },
  methods: {
    openPopup() {
      console.log('Opening Popup');
      this.$refs.myModalRef.show();
    },
    /* Handle click */
    toggleEditor() {
      console.log('A');
      this.$store.dispatch('toggleOptsbar', { component: this.optsbarComponent });
    },
    /* Handle click */
    deletePrompt() {
      console.log('B');
      this.$refs.myModalRef.show();
      // this.$store.dispatch('toggleOptsbar', { component: this.optsbarComponent });
    },
  },
};
</script>

<style>
</style>
