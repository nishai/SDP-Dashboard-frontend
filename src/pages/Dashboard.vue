<template>
  <div class="dashboard">
    <Heading heading_text="Dashboard"></Heading>
    <div class="d-flex flex-wrap justify-content-between">
      <div class="d-flex flex-wrap justify-content-start">
        <DashboardChart style="width: 400px;" class="m-2" v-for="(chart, id) in dashboardCharts" v-bind:key="id" v-bind:dashboardChartId="id" v-bind:chart="chart"  ></DashboardChart>
        <div style="width: 400px;" class="d-flex justify-content-center">
          <!-- <router-link :to="{path: '/'}"> -->
          <b-button class="my-4 mx-2" style="height: 48px;" variant="outline-success" size="lg" @click="create"> New Chart </b-button>
          <!-- </router-link> -->
        </div>
      </div>
      <div>
      <b-button class="my-4 mx-2" style="height: 48px;" variant="outline-success" size="lg" v-on:click="add_table = true"> New Table </b-button>
        <Table v-if="add_table"></Table>
      </div>
      <div>
    </div>
  </div>
</div>
</template>

<script>
import Heading from '../components/misc/Heading.vue';
import Chart from '../components/charts/chartjs/Chart.vue';
import Table from '../components/charts/chartjs/Table.vue';
import DashboardChart from '../components/dashboard/DashboardChart.vue';

export default {
  name: 'Dashboard',
  data() {
    return {
      add_table: false,
      add_list: false,
    };
  },
  components: {
    Heading,
    Chart,
    Table,
    DashboardChart,
  },
  computed: {
    dashboardCharts() {
      return this.$store.state.dashboardCharts.dashboardCharts;
    },
  },

  /**
  mounted: function () {
    this.$store.dispatch({
      type: 'createDashboardChart',
      chartType: this.$route.query.chartType,
      groupBy: this.$route.query.groupBy,
      years: this.$route.query.years,
      faculties: this.$route.query.faculties,
      schools: this.$route.query.schools,
      courses: this.$route.query.courses,
      duplicates: this.$route.query.duplicates,
    });
  },*/
  methods:{
    create(){
      this.$router.push({ path: '/' });
    }
  }
};
</script>

<style>

</style>
