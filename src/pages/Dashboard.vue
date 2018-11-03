<template>
  <div class="dashboard">
    <Heading heading_text="Dashboard"></Heading>
    <div>
       <!-- <router-link :to="{path: '/'}"> -->
       <b-button class="my-4 mx-2" style="height: 48px;" variant="outline-success" size="lg" @click="create"> New Chart </b-button>
       <!-- </router-link> -->
      <b-button class="my-4 mx-2" style="height: 48px;" variant="outline-success" size="lg" v-on:click="add_table = true"> New Table </b-button>
        <Table v-if="add_table"></Table>
    </div>
    <grid-layout
      :layout="layouts"
      :col-num="100"
      :row-height="25"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :margin="[1, 1]"
      :use-css-transforms="true">

      <grid-item
        v-for="(chart,id) in getCharts"
        :key="id"
        :x="chart.layout.x"
        :y="chart.layout.y"
        :w="chart.layout.w"
        :h="chart.layout.h"
        :max-w="70"
        :max-h="1"
        :min-w="10"
        :min-h="1"
				@resize="resizeEvent"
				@move="moveEvent"
        :i="chart.layout.i">
        <DashboardChart
				  style="width: 100%;position:relative;"
          class="m-2"
          v-bind:key="id"
          v-bind:dashboardChartId="id"
          v-bind:chart="chart">
        </DashboardChart>
      </grid-item>
    </grid-layout>
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
    ]),
    layouts() {
      let layouts = [];
      let charts = this.getCharts;
      for(var chartId in charts){
        layouts = layouts.concat({
          x: charts[chartId].layout.x,
          y: charts[chartId].layout.y,
          w: charts[chartId].layout.w,
          h: charts[chartId].layout.h,
          i: charts[chartId].layout.i,
        });
      }
      return layouts;
    },
  },

  methods:{
    create(){
      this.$router.push({ path: '/' });
    },
		resizeEvent(i, newH, newW, newHPx, newWPx){
			this.$store.dispatch(
			  'updateChartLayout',
				{
				  newLayout: [{
						x: -1,
						y: -1,
						w: newW,
						h: newH,
						i: i,
					}],
				}
		  );
		},
		moveEvent(i, newX, newY){
			this.$store.dispatch(
			  'updateChartLayout',
				{
				  newLayout: [{
						x: newX,
						y: newY,
						w: -1,
						h: -1,
						i: i,
					}],
				}
		  );
	  },
  }
};
</script>

<style>

</style>
