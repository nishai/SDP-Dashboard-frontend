<template>
  <div class="dashboard">
    <Heading heading_text="Dashboard"></Heading>

    <div>
  <b-button-group class="newstuff" vertical>
    <b-button size="lg" variant="outline-success" @click="create" >New chart</b-button>
    <b-button size="lg" variant="outline-success" @click="add_table = true" >New table</b-button>
    <b-button size="lg" variant="outline-success" @click="add_list = true" >New list</b-button>
  </b-button-group>
</div>

    <div class="d-flex flex-wrap justify-content-between">
      <div class="d-flex flex-wrap justify-content-start">
        <DashboardChart style="width: 400px;" class="m-2" v-for="(chart, id) in dashboardCharts" v-bind:key="id" v-bind:dashboardChartId="id" v-bind:chart="chart"  ></DashboardChart>
        <div style="width: 400px;" class="d-flex justify-content-center">
          <!-- <router-link :to="{path: '/'}"> -->
            <!-- <b-button class="my-4 mx-2" style="height: 48px;" variant="outline-success" size="lg" @click="create"> New Chart </b-button> -->
          <!-- </router-link> -->
        </div>
      </div>
      <div>
      <!-- <b-button class="my-4 mx-2" style="height: 48px;" variant="outline-success" size="lg" v-on:click="add_table = true"> New Table </b-button> -->
        <Table v-if="add_table"></Table>
      </div>
      <div>
      <!-- <b-button class="my-4 mx-2" style="height: 48px;" variant="outline-success" size="lg" @click="add_list = true"> New List </b-button> -->
        <List v-if="add_list"></List>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '../components/misc/Heading.vue';
import Chart from '../components/charts/chartjs/Chart.vue';
import Table from '../components/charts/chartjs/Table.vue';
import List from '../components/charts/chartjs/List.vue';
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
    List,
    DashboardChart,
  },
  computed: {
    dashboardCharts() {
      return this.$store.state.dashboardCharts.dashboardCharts;
    },
  },
  methods: {
    create() {
      this.$store.dispatch('createDashboardChart');
      // router.push({ path: 'register', query: { plan: 'private' }});
      // console.log(bla);
      // this.$router.push({path: '/'});
    },
  },
};
</script>

<style>

.newstuff {
  right: 10px;
  top: 10px;
  position: fixed;
}

</style>
