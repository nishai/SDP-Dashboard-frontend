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
          <!-- <b-btn size="sm" class="m-1" variant="outline-primary" @click="toggleEditor">Edit</b-btn> -->
          <!--<b-btn size="sm" variant="outline-primary" @click="toggleEditor">Opts</b-btn>-->
          <!-- <b-btn size="sm" class="m-1" variant="outline-danger" @click="deleteChart">Delete</b-btn> -->
          <!-- <b-btn size="sm" class="m-1" variant="outline-secondary" @click="addData()">Compare</b-btn> -->
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
      <b-card-footer>
        <b-btn size="sm" class="m-1" variant="outline-primary" @click="toggleEditor">Edit</b-btn>
        <b-btn size="sm" class="m-1" variant="outline-secondary" @click="addData()">Compare</b-btn>
        <b-btn size="sm" class="m-1" variant="outline-danger" @click="deleteChart">Delete</b-btn>
        <!-- {{ details }} -->
       </b-card-footer>
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
  data: () => ({
    optsbarComponentPrivate: null,
    showPopup: false,
    // datacollection : {
    //   title: this.$vnode.datacollection.title,
    //   labels: this.$vnode.datacollection.labels,
    //   datasets: this.$vnode.datacollection.datasets.concat(
    //     data: [55, 8, 12, 18, 7],
    //     backgroundColor: [
    //       'rgba(255,99,132,1)',
    //       'rgba(54, 162, 235, 1)',
    //       'rgba(255, 206, 86, 1)',
    //       'rgba(75, 192, 192, 1)',
    //       'rgba(153, 102, 255, 1)',
    //     ],
    //   ),
    //   options: this.$vnode.datacollection.options,
    // };
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
    deleteChart() {
      console.log('DELETING');
      console.log(this.key);
      console.log(this.$vnode.key);
      this.$store.dispatch('deleteDashboardChart', { dashboardChartId: this.$vnode.key });
    },
    // addData() {
    //   const newData = [{
    //     data: [55, 8, 12, 18, 7],
    //     backgroundColor: [
    //       'rgba(255,99,132,1)',
    //       'rgba(54, 162, 235, 1)',
    //       'rgba(255, 206, 86, 1)',
    //       'rgba(75, 192, 192, 1)',
    //       'rgba(153, 102, 255, 1)',
    //     ],
    //   }];
    //   this.$vnode.datacollection = {
    //     title: this.$vnode.datacollection.title,
    //     labels: this.$vnode.datacollection.labels,
    //     datasets: this.$vnode.datacollection.datasets.concat(newData),
    //     options: this.$vnode.datacollection.options,
    //   };
    // },
  },
};
</script>

<style>

.card:hover {
  background-color: whitesmoke;
}

.card:hover button {
  opacity: 1;
}

.card button {
  opacity: 0;
  background-color: whitesmoke;
}

</style>
