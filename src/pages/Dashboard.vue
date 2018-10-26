<template>
  <div class="dashboard">
    <Heading heading_text="Dashboard"></Heading>
    <!--div class="d-flex flex-wrap justify-content-between"-->
      <!--div class="d-flex flex-wrap justify-content-start"-->
        <!--div style="width: 400px;" class="d-flex justify-content-center"-->
          <grid-layout
            :layout="layouts"
            :col-num="10"
            :row-height="10"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[5, 5]"
            :use-css-transforms="true"
            @layout-updated="layoutUpdatedEvent">

            <grid-item
              v-for="(chart,id) in getCharts"
              :key="id"
              :class="{ 'editMode' : 'true' }"
              :autoSize="true"
              :x="chart.x"
              :y="chart.y"
              :w="chart.w"
              :h="chart.h"
              :max-w="7"
              :max-h="40"
              :min-w="1"
              :min-h="10"
              :i="chart.i">
                {{chart}}
                  <DashboardChart
                    style="width: 400px;"
                    class="m-2"
                    v-bind:key="id"
                    v-bind:dashboardChartId="id"
                    v-bind:chart="chart">
                  </DashboardChart>
              </grid-item>
            </grid-layout>
        <!--/div-->
      <!--/div-->
      <div>
       <!-- <router-link :to="{path: '/'}"> -->
       <b-button class="my-4 mx-2" style="height: 48px;" variant="outline-success" size="lg" @click="create"> New Chart </b-button>
       <!-- </router-link> -->>
      <b-button class="my-4 mx-2" style="height: 48px;" variant="outline-success" size="lg" v-on:click="add_table = true"> New Table </b-button>
        <Table v-if="add_table"></Table>
      </div>
  <!--/div-->
</div>
</template>

<script>
import Heading from '../components/misc/Heading.vue';
import Chart from '../components/charts/chartjs/Chart.vue';
import Table from '../components/charts/chartjs/Table.vue';
import DashboardChart from '../components/dashboard/DashboardChart.vue';
import { GridLayout } from 'vue-grid-layout';
import { GridItem } from 'vue-grid-layout';
import { mapGetters } from 'vuex';

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
    GridLayout,
    GridItem,
  },
  computed: {
    ...mapGetters([
      'getCharts',
      'numCharts',
    ]),
    // dashboardCharts() {
    //   return this.$store.state.dashboardCharts.dashboardCharts;
    // },
    layouts() {
      let layouts = [];
      let charts = this.getCharts;
      for(var chartId in charts){
        layouts = layouts.concat({
          x: charts[chartId].x,
          y: charts[chartId].y,
          w: charts[chartId].w,
          h: charts[chartId].h,
          i: charts[chartId].i,
        });
      }
      return layouts;
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
    },
    layoutUpdatedEvent(newLayout){
      console.log("Updated layout: ", newLayout)
      this.$store.dispatch('updateChartLayout', {newLayout: newLayout});
    },
  }
};
</script>

<style>

</style>
