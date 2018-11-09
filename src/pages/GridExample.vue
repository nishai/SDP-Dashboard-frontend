<template>

 <div class="Grid">

      <grid-layout
            :layout="layout"
            :col-num="10"
            :row-height="10"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
    >

        <grid-item v-for="(item, id) in layout"
                   :key="id"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :max-w="7"
                   :max-h="40"
                   :min-w="1"
                   :min-h="10"
                   :i="item.i">
                    <!-- {{item.i}} -->


  <div class="dashboardChart">

        <DashboardChart style="width: 100%;position:relative;" class="m-2" v-for="(chart, id) in dashboardCharts" v-bind:key="id" v-bind:dashboardChartId="id" v-bind:chart="chart"  ></DashboardChart>
  </div>


       </grid-item>
    </grid-layout>
</div>

</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout';
import Heading from '../components/misc/Heading.vue';
import Chart from '../components/charts/chartjs/Chart.vue';
import Table from '../components/charts/chartjs/Table.vue';
import DashboardChart from '../components/dashboard/DashboardChart.vue';

const testLayout = [
  {
    'x': 0, 'y': 0, 'w': 3.5, 'h': 27, 'i': '0',
  },
  {
    'x': 0, 'y': 0, 'w': 3.5, 'h': 27, 'i': '1',
  },

];


export default {
  name: 'Dashboard',
  data() {
    return {
      layout: testLayout,
      add_table: false,
      add_list: false,
    };
  },
  components: {
    Heading,
    Chart,
    Table,
    DashboardChart,
    GridLayout,
    GridItem,
  },
  computed: {
    dashboardCharts() {
      return this.$store.state.dashboardCharts.dashboardCharts;
    },
  },
  methods: {
    create() {
      this.$store.dispatch('createDashboardChart'); // TODO: Correct this to be the same as in pages/Dashboard.vue
      // router.push({ path: 'register', query: { plan: 'private' }});
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style>

</style>

