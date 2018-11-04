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
			this.chartResultsLabels.push([]);
			this.chartResultsData.push([]);
			for(let j = 0; j < this.$props.chartData[index].years.length; j += 1){
				this.chartResultsLabels[index].push(null);
				this.chartResultsData[index].push(null);
				apiQuery.getCourseStats(
					this.$props.chartData[index].groupBy,
					this.$props.chartData[index].years[j],
					this.$props.chartData[index].faculties,
					this.$props.chartData[index].schools,
					this.$props.chartData[index].courses,
					this.$props.chartData[index].duplicate
					).then((response) => {
						const { results } = response.data;
						console.log('RESPONSE DATA:', response.data);
						if (response.data.results.length !== 0) {
							const keys = Object.keys(results[0]);
							let sum = 0;
							let numDatapoints = 0;
							for (let k = 0; k < results.length; k += 1) { 
								sum += parseInt(results[k][keys[0]], 10) * parseInt(results[k][keys[1]],10);
								numDatapoints += parseInt(results[k][keys[1]], 10)
							}
							var avg = sum/numDatapoints;

							this.isData = true;
							this.chartResultsLabels[index][j] = this.$props.chartData[index].years[j];
							this.chartResultsData[index][j] = avg;
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
				if (this.chartResultsData[l].length !== this.chartData[l].years.length ||
					this.chartResultsData[l].includes(null)){
					barFlag = false;
				}
			}
      if(
				this.chartResultsData.length === this.chartData.length &&
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
	  						y: this.chartResultsData[i][j],
		  				})
			  		}
						labels = labels.sort((a, b) => transform(a) - transform(b));
					} else {
						data = this.chartResultsData[i];
					}
	  			let colors;
					if(this.$props.chartData[i].chartType === "line"){
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
        this.$refs.chart.renderChart(
          {
            // type: this.chartType,
            labels: labels,
            datasets: datasets,
          },
          {
            responsive: true,
            maintainAspectRatio: false,
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true,
								}
							}]
						}
          },
        );
      }
    },
  }, /* >>> END METHODS <<< */
};
</script>

<style scoped>

</style>
