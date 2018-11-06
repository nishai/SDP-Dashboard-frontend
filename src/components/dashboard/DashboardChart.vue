<template>
  <div>
    <b-card no-body>
      <!-- Heading -->
      <div slot="header" class="m-0">
        <b-form-input
          class="hidden-input"
          :value="dashboardChart.name"
          v-on:change="renameChart($event)"
          type="text"
          placeholder="Click To Edit">
        </b-form-input>
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
        <Chart :chartData="dashboardChart.charts"></Chart>
      </b-card-body>
      <b-btn size="sm" class="m-1" variant="outline-primary" @click="openPopup()">Compare</b-btn>
      <!-- Info -->
      <b-card-footer> {{ details }} </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
      maintainAspectRatio: false,
      responsive: true,
    },
  },
  components: {
    Chart,
    FeatherIcon,
  },
  data: () => ({
    optsbarComponentPrivate: null,
    showPopup: false,
    maintainAspectRatio: false,
    responsive: true,

  }),
  computed: {
    ...mapGetters([
      'getChart',
    ]),
    dashboardChart() {
      return this.getChart(this.$props.dashboardChartId);
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
      console.log('Opening popup in parent');
      this.$parent.$parent.$parent.openPopup(this.dashboardChartId);
    },
    /* Handle click */
    toggleEditor() {
      console.log('A');
      this.$store.dispatch('toggleOptsbar', { component: this.optsbarComponent });
    },
    deleteChart() {
      console.log('DELETING');
      console.log(this.$vnode.key);
      this.$store.dispatch('deleteDashboardChart', { dashboardChartId: this.$vnode.key });
    },
    renameChart(e) {
      this.$store.dispatch('renameChart', { name: e, id: this.$vnode.key });
      this.$vnode.key = e;
    },
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
