<template>
  <div>

    <!-- Modal Component -->
    <b-modal ref="compareModal" id="modal1" title="Compare Options" size="lg" hide-footer>
      <FilterForm
        v-bind:chartType="true"
        v-bind:groupByDesc="dashboardChart.charts[0].groupBy"
        v-bind:fyear="true"
        v-bind:fcourse="true"
        v-bind:ffaculty="true"
        v-bind:fschool="true"
        v-bind:numForms="2"
        v-bind:selectedChartType="dashboardChart.charts[0].chartType"
        v-bind:selectedYear="dashboardChart.charts[0].years"
        v-bind:selectedCourse="dashboardChart.charts[0].courses"
        v-bind:selectedFaculty="dashboardChart.charts[0].faculties"
        v-bind:selectedSchool="dashboardChart.charts[0].schools"
        v-bind:selectedDuplicate="dashboardChart.charts[0].duplicate">
      </FilterForm>
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
        <Chart :chartData="dashboardChart.charts"></Chart>
      </b-card-body>
      <b-btn @ size="sm" class="m-1" variant="outline-primary" @click="openPopup()">Compare</b-btn>
      <!-- Info -->
      <b-card-footer> {{ details }} </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import Chart from '../charts/chartjs/Chart.vue';
import FeatherIcon from '../misc/FeatherIcon.vue';
import FilterForm from '../modal/FilterForm.vue';

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
    FilterForm,
  },
  data: () => ({
    optsbarComponentPrivate: null,
    showPopup: false,
    maintainAspectRatio: false,
    responsive: true,

  }),
  computed: {
    dashboardChart() {
      return this.$store.state.dashboardCharts.dashboardCharts[this.$props.dashboardChartId];
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
      this.$refs.compareModal.show();
    },
    hideModal() { // needs to have same name as in FilterFormModal
      console.log('Closing Popup');
      this.$refs.compareModal.hide();
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
