<template>
  <div align="center">
    <h6> {{ this.$props.chartData }} </h6>
    <h1 v-if="isData === false"> NO DATA FOUND FOR QUERY </h1>
    <!--component :is="component" ref="chart"></component-->
    <component :is="component" ref="chart"></component>
  </div>
</template>

<script>

import palette from 'google-palette';
import vueCharts from 'vue-chartjs';
import apiQuery from '../../../api/api_query';
import ChartModule from 'chartjs-plugin-labels';

// https://github.com/emn178/chartjs-plugin-labels
Chart.defaults.global.plugins.labels = {
  render: 'percentage',
  fontColor: '#333',
  precision: 2,
};

const chartTypes = {
  'bar': vueCharts.Bar,
  'horizontalbar': vueCharts.HorizontalBar,
  'doughnut': vueCharts.Doughnut,
  'line': vueCharts.Line,
  'pie': vueCharts.Pie,
  'polar': vueCharts.PolarArea,
  'radar': vueCharts.Radar,
  'bubble': vueCharts.Bubble,
  'scatter': vueCharts.Scatter,
};

export default {
  name: 'Chart',
  components: {
    ChartModule,
  },
  props: ['chartData'],
  data: () => ({
    isData: false,
    chartResultsLabels: [],
    chartResultsData: [],
  }),

  computed: {
    component(){
      return chartTypes[this.$props.chartData[0].chartType];
    },
  },
  /**
   * run when component is created
   */
  mounted() {
    for (let i = 0; i < this.$props.chartData.length; i += 1) {
      console.log('Mounted!',
        this.$props.chartData[i].groupBy,
        this.$props.chartData[i].years,
        this.$props.chartData[i].faculties,
        this.$props.chartData[i].schools,
        this.$props.chartData[i].courses,
        this.$props.chartData[i].duplicate
      );
			if(this.$props.chartData[0].chartType === 'bar'){
				this.getBarData(i);
			} else {
	      this.getData(i);
			}
    }
    // this.renderChart();
  },

  /**
   * Methods accessible to component
   */
  methods: {

		getBarData(index) {
			let forLimit;
			switch(this.$props.chartData[index].groupBy){
				case 'pass_rates_by_year':
					forLimit = this.$props.chartData[index].years.length;
					break;
				case 'pass_rates_by_course':
				case 'progress_outcome_by_course':
					forLimit = this.$props.chartData[index].courses.length;
					break;
			}
			this.chartResultsLabels.push([]);
			this.chartResultsData.push([]);
			for(let j = 0; j < forLimit; j += 1){
				this.chartResultsLabels[index].push(null);
				this.chartResultsData[index].push(null);

				let queryArr;
				switch(this.$props.chartData[index].groupBy){
					case 'pass_rates_by_year':
						queryArr = [
							'course_stats',
							'final_mark',
							this.$props.chartData[index].years[j],
							this.$props.chartData[index].faculties,
							this.$props.chartData[index].schools,
							this.$props.chartData[index].courses,
							this.$props.chartData[index].duplicate
						]
						break;
					case 'pass_rates_by_course':
						queryArr = [
							'course_stats',
							'final_mark',
							this.$props.chartData[index].years,
							this.$props.chartData[index].faculties,
							this.$props.chartData[index].schools,
							this.$props.chartData[index].courses[j],
							this.$props.chartData[index].duplicate
						]
						break;
					case 'progress_outcome_by_course':
						queryArr = [
							'average_year_stats',
							'progress_outcome_type',
							this.$props.chartData[index].years,
							this.$props.chartData[index].faculties,
							this.$props.chartData[index].schools,
							this.$props.chartData[index].courses[j],
							this.$props.chartData[index].duplicate
						]
						break;
				}
				console.log(queryArr[0], queryArr[1], queryArr[2], queryArr[3], queryArr[4], queryArr[5], queryArr[6])
				apiQuery.getCourseStats(
					queryArr[0],
					queryArr[1],
					queryArr[2],
					queryArr[3],
					queryArr[4],
					queryArr[5],
					queryArr[6],
					).then((response) => {
						const { results } = response.data;
						console.log('RESPONSE DATA:', response.data);
						if (response.data.results.length !== 0) {
							const keys = Object.keys(results[0]);
							let sum = 0;
							let numDatapoints = 0;
							let labels = [];
							let data = [];
							for (let k = 0; k < results.length; k += 1) {
								//sum += parseInt(results[k][keys[0]], 10) * parseInt(results[k][keys[1]],10); // for average mark
								switch(this.$props.chartData[index].groupBy){
									case 'pass_rates_by_year':
									case 'pass_rates_by_course':
										if (parseInt(results[k][keys[0]], 10) > 50) {
											sum += parseInt(results[k][keys[1]],10);
										}
										numDatapoints += parseInt(results[k][keys[1]], 10)
										break;
									case 'progress_outcome_by_course':
										labels.push(results[k][keys[0]]);
										data.push(results[k][keys[1]]);
										break;
								}
							}
							var avg = sum/numDatapoints;

							this.isData = true;
							switch(this.$props.chartData[index].groupBy){
								case 'pass_rates_by_year':
									this.chartResultsLabels[index][j] = this.$props.chartData[index].years[j];
									this.chartResultsData[index][j] = avg;
									break;
								case 'pass_rates_by_course':
									this.chartResultsLabels[index][j] = this.$props.chartData[index].courses[j];
									this.chartResultsData[index][j] = avg;
									break;
								case 'progress_outcome_by_course':
									this.chartResultsLabels[index] = labels;
									this.chartResultsData[index] = data;
									break;
							}
            	this.renderChart();
						}
					});
			}
		},

    /**
     * Query for the data to render based on the current url parameters
     */
    getData(index) {
      console.log('LOADING DATA');
      // TODO: Multiple sub-charts
      apiQuery.getCourseStats(
				'course-stats',
        this.$props.chartData[index].groupBy,
        this.$props.chartData[index].years,
        this.$props.chartData[index].faculties,
        this.$props.chartData[index].schools,
        this.$props.chartData[index].courses,
        this.$props.chartData[index].duplicate
        ).then((response) => {
          const { results } = response.data;
          console.log('RESPONSE DATA:', response.data);
          if (response.data.results.length !== 0) {
            const keys = Object.keys(results[0]);
            const labels = [];
            const data = [];
            for (let j = 0; j < results.length; j += 1) { // TODO: add query parameter to perform this on the backend
              labels.push(results[j][keys[0]]);
              data.push(results[j][keys[1]]);
            }
            this.isData = true;
            this.chartResultsLabels.push(labels)
            this.chartResultsData.push(data);
            this.renderChart();
          }
        });
    },

    /**
     * Render the current loaded data to the chart component
     */
    renderChart() {

			let barFlag = true;
			for (let l = 0; l < this.chartResultsData.length; l += 1) {
				let ifTest;
				switch(this.$props.chartData[l].groupBy){
					case 'pass_rates_by_year':
						ifTest = this.chartData[l].years.length;
						break;
					case 'pass_rates_by_course':
						ifTest = this.chartData[l].courses.length;
						break;
				}
				if (this.chartResultsData[l].length !== ifTest ||
					this.chartResultsData[l].includes(null)){
					barFlag = false;
				}
			}
      if(
				(this.$props.chartData[0].chartType !== 'bar' ||
				this.$props.chartData[0].chartType === 'bar' &&
				barFlag)
			){
				console.log(this.chartResultsData)
				console.log(this.chartResultsLabels)
        /*if (labels.length !== data.length) {
          throw new Error('Label length not equal to data length');
        }*/
        let datasets = [];
        let labels = [];

				//https://stackoverflow.com/questions/51560507/javascript-sort-an-array-of-string-numbers
				const transform = k => {
			    if (k === 'K') return 0;
 		  	  else if (k === 'N') return 13;
          else return +k;
        }


				let beginZero = false;
        for (let i = 0; i < this.$props.chartData.length; i += 1) {
          labels = [...new Set([...labels, ...this.chartResultsLabels[i]])];
					let data = [];
					if(this.$props.chartData[i].chartType === "line"){
  					data.push({
	  					labels: this.chartResultsLabels[i]
		  			})
			  		for (var j = 0; j < this.chartResultsData[i].length; j += 1){
				  		data.push({
  							x: this.chartResultsLabels[i][j],
	  						y: (100.0 * this.chartResultsData[i][j]) / this.chartResultsData[i].reduce((a, b) => a + b, 0),
	  						//y: this.chartResultsData[i][j]),
		  				})
			  		}
						labels = labels.sort((a, b) => transform(a) - transform(b));
					} else {
						data = this.chartResultsData[i];
					}
	  			let colors;
					if(this.$props.chartData[i].chartType === "line" ||
						this.$props.chartData[i].chartType === "bar"){
						beginZero = true;
						colors = palette(
							'tol-rainbow',
							this.$props.chartData.length
						).map((color) => `#${color}`)[i];
					} else {
						colors = palette('tol-rainbow', labels.length).map((color) => `#${color}`);
					}
          datasets.push({
            backgroundColor: colors, // http://google.github.io/palette.js/
            data: data,
            borderWidth: 2,
            type: this.$props.chartData[i].chartType,
            fill: true,
		  			label: this.$props.chartData[i].courses,
          });
        }

				let scales = {}
				if (beginZero){
					scales = {
						yAxes: [{
							ticks: {
								beginAtZero: true,
							}
						}]
					}
				}
        this.$refs.chart.renderChart(
          {
            // type: this.chartType,
            labels: labels,
            datasets: datasets,
          },
          {
            responsive: true,
            maintainAspectRatio: false,
						scales: scales,
          },
        );
      }
    },
  }, /* >>> END METHODS <<< */
};
</script>

<style scoped>

</style>
