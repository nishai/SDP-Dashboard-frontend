<template>
  <div class="dashboard">
    <!-- Modal Component -->
	  <b-modal ref="compareModal" id="compareModal" title="Compare Options" size="lg" hide-footer>
      <FilterForm
				v-if="showModal"
        v-bind:chartType="true"
        v-bind:groupByDesc="popupChart.charts[0].groupBy"
        v-bind:fyear="true"
        v-bind:fcourse="true"
        v-bind:ffaculty="true"
        v-bind:fschool="true"
        v-bind:numForms="2"
        v-bind:selectedChartType="popupChart.charts[0].chartType"
        v-bind:selectedYear="popupChart.charts[0].years"
        v-bind:selectedCourse="popupChart.charts[0].courses"
        v-bind:selectedFaculty="popupChart.charts[0].faculties"
        v-bind:selectedSchool="popupChart.charts[0].schools"
        v-bind:selectedDuplicate="popupChart.charts[0].duplicate">
      </FilterForm>
    </b-modal>

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
          v-bind:dashboardChartId="id">
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
import FilterForm from '../components/modal/FilterForm.vue';
import { GridLayout } from 'vue-grid-layout';
import { GridItem } from 'vue-grid-layout';
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  data() {
    return {
      add_table: false,
      add_list: false,
			showModal: false,
			popupchartId: 0,
    };
  },
  components: {
    Heading,
    Chart,
    Table,
    DashboardChart,
    GridLayout,
    GridItem,
		FilterForm,
  },
  computed: {
    ...mapGetters([
      'getCharts',
			'getChart',
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
    popupChart() {
      return this.getChart(this.popupChartId);
    },
  },

  methods:{
    create(){
      this.$router.push({ path: '/' });
    },
    openPopup(chartId) {
      console.log('Opening Popup');
			this.showModal = true;
			this.popupChartId = chartId;
      this.$refs.compareModal.show();
    },

    hideModal() { // needs to have same name as in FilterFormModal
      console.log('Closing Popup');
			this.showModal = false;
      this.$refs.compareModal.hide();
    },
    deleteChart() {
      console.log('DELETING');
      console.log(this.popupChartId);
      this.$store.dispatch('deleteDashboardChart', { dashboardChartId: this.popupChartId });
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
