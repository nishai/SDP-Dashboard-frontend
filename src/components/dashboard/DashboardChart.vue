<template>
  <div>

    <!-- Modal Component -->
    <b-modal ref="myModalRef" id="modal1" title="Bootstrap-Vue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>

    <b-card no-body>
      <!-- Heading -->
      <div slot="header" class="d-flex justify-content-between">
        <b-form-input class="hidden-input" v-model="dashboardChart.name" type="text" placeholder="Click To Edit"></b-form-input>
        <small class="d-flex justify-content-between">
          <b-btn size="sm" class="m-1" variant="outline-primary" @click="toggleEditor">Edit</b-btn>
          <!--<b-btn size="sm" variant="outline-primary" @click="toggleEditor">Opts</b-btn>-->
          <b-btn size="sm" class="m-1" variant="outline-danger" @click="deleteChart">Delete</b-btn>
          <!--<b-btn v-b-modal.modal1>Launch demo modal</b-btn>-->
          <!--<FeatherIcon name="trash" class="mr-2" @click="openPopup"></FeatherIcon>-->
          <!--<FeatherIcon name="edit-2" @click="openPopup"></FeatherIcon>-->
        </small>
      </div>
      <!-- Chart -->
      <b-card-body style="padding: 5px;">
        <Chart :type="dashboardChart.type"></Chart>
      </b-card-body>
      <!-- Info -->
      <b-card-footer> {{ details }} </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import Chart from '../charts/chartjs/Chart.vue';
import FeatherIcon from '../misc/FeatherIcon.vue';

export default {
  name: 'DashboardChart',
  props: {
    dashboardChartId: {
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
  // props: ['key'],
  data: () => ({
    optsbarComponentPrivate: null,
    showPopup: false,
  }),
  computed: {
    dashboardChart() {
      return this.$store.state.dashboardCharts.dashboardCharts[this.dashboardChartId];
    },
    details() {
      return 'TODO: details';
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
    // deletePrompt() {
    //   console.log('B');
    //   this.$refs.myModalRef.show();
    //   this.$store.dispatch('toggleOptsbar', { component: this.optsbarComponent });
    // },
    deleteChart() {
      console.log('DELETING');
      console.log(this.key);
      console.log(this.$vnode.key);
      this.$store.dispatch('deleteDashboardChart', { dashboardChartId: this.dashboardChartId });
    },
  },
};
</script>

<style>
</style>
