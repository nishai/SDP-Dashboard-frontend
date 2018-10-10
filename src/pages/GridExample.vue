<template>

 <div class="Grid">

      <grid-layout
            :layout="layout"
            :col-num="12"
            :row-height="12"
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
                   :i="item.i">
                    <!-- {{item.i}} -->
 

  <div class="dashboardChart">
    <!-- <div class="d-flex flex-wrap justify-content-between"> -->
      <!-- <div class="d-flex flex-wrap justify-content-start"> -->
        <DashboardChart style="width: 100%;height: 100%;position:relative;" class="m-2" v-for="(chart, id) in dashboardCharts" v-bind:key="id" v-bind:dashboardChartId="id" v-bind:chart="chart"  ></DashboardChart>
        <div style="width: 400px;" class="d-flex justify-content-center">
          <!-- <router-link :to="{path: '/'}"> -->
          <!--   <b-button class="my-4 mx-2" style="height: 48px;" variant="outline-success" size="lg" @click="create"> New Chart </b-button> -->
          <!-- </router-link> -->
        </div>
      <!-- </div> -->
      <div>
      <!-- <b-button class="my-4 mx-2" style="height: 48px;" variant="outline-success" size="lg" v-on:click="add_table = true"> New Table </b-button>
        <Table v-if="add_table"></Table> -->
      </div>
      <div>
      <!-- <b-button class="my-4 mx-2" style="height: 48px;" variant="outline-success" size="lg" @click="add_list = true"> New List </b-button>
        <List v-if="add_list"></List> -->
      </div>
    </div>
  <!-- </div> -->




       </grid-item>
    </grid-layout>
</div>

</template>

<script>
import Heading from '../components/misc/Heading.vue';
import Chart from '../components/charts/chartjs/Chart.vue';
import Table from '../components/charts/chartjs/Table.vue';
import List from '../components/charts/chartjs/List.vue';
import DashboardChart from '../components/dashboard/DashboardChart.vue';
import { GridLayout } from 'vue-grid-layout';
import { GridItem } from 'vue-grid-layout';


var testLayout = [
        {"x":0,"y":0,"w":5,"h":27,"i":"0"},
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
    List,
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
      this.$store.dispatch('createDashboardChart');
      // router.push({ path: 'register', query: { plan: 'private' }});
      this.$router.push({path: '/'});
    },
  },
};
</script>

<style>

</style>




