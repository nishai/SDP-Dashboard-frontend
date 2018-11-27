
<!--

MODIFIED VUE-CHARTJS IMPLEMENTATION

/**
 * The default implementation was retarded
 * and didn't watch the type or the options,
 * and was not documented...
 *
 * It also didnt do responsiveness by default.
 *
 * This implementation has one event:
 *   @resize="({width, height}, chartObj) => ..."
 */

https://github.com/apertureless/vue-chartjs/blob/develop/src/mixins/index.js
https://vue-chartjs.org/guide/#chart-with-dynamic-styles
http://www.chartjs.org/docs/latest/getting-started/usage.html

https://vue-chartjs.org/api/#props
  type: String matching a chartjs type
  data: Object with chart labels and datasets
  options: Object with chartjs options.
  plugins: Array with chartjs plugins

https://vue-chartjs.org/api/#events
  chart:render    if the mixin performs a complete rerender
  chart:destroy   if the mixin deletes the chart object instance
  chart:update    if the mixin performs an update instead of a re-render
  labels:update   if new labels were set
  xlabels:update  if new xLabels were set
  ylabels:update  if new yLabels were set

/*
 * Not Shrinking Issue With Flex Boxes:
 *  - https://github.com/chartjs/Chart.js/issues/4156
 *
 * Responsive Example:
 *  - https://codepen.io/anon/pen/KrvZBv
 *  - https://www.chartjs.org/docs/latest/general/responsive.html#important-note
 *  - https://codepen.io/SitePoint/pen/mJRrKw
 */
-->


<template>
  <!-- USED TO MAKE THE CHART RESPONSIVE -->
  <div style="position: relative">
    <canvas class="chart-canvas" ref="canvas"/>
    <b-loading :active="!data || !type" :is-full-page="false"/>
  </div>
</template>


<script>
import clonedeep from 'lodash.clonedeep';
import Chart from 'chart.js';

/**
 * Aliases are the keys in this dictionary.
 * Both keys and values work for setting the type.
 *
 * @type {{bar: string, hbar: string, donut: string, line: string, pie: string, polar: string, radar: string, bubble: string, scatter: string}}
 */
const chartTypeAliases = {
  'bar': 'bar',
  'hbar': 'horizontalBar', // alias
  'donut': 'doughnut', // alias
  'line': 'line',
  'pie': 'pie',
  'polar': 'polarArea', // alias
  'radar': 'radar',
  'bubble': 'bubble',
  'scatter': 'scatter',
};

export default {
  name: 'v-chart',

  props: {
    /* chart data */
    type: { type: String, default: undefined }, // https://www.chartjs.org/docs/latest/charts/
    options: { type: Object, default: undefined }, // Global defaults can be set: https://www.chartjs.org/docs/latest/configuration/
    data: { type: Object, default: undefined }, // type dependent data, generally of the form: { labels: [...], datasets: [...] }
    plugins: { type: Array, default: undefined }, // chartjs plugins?

    /* override values in passed options */
    responsive: { type: Boolean, default: true }, // if chartjs should update the size of the canvas to that of the parent element.
    maintainAspectRatio: { type: Boolean, default: false }, // if the initial aspect ratio of chart should be kept.
  },

  data() {
    return {
      /**
       * chartjs instance used to
       * render to the canvas.
       */
      chartObj: null,
    };
  },

  computed: {
    /**
     * Used to override certain options,
     * based on the props of the component.
     */
    overriddenOptions() {
      const options = Object.assign(clonedeep(this.options || {}), {
        responsive: this.responsive,
        maintainAspectRatio: this.maintainAspectRatio,
        onResize: this.onResize,
        responsiveAnimationDuration: 0,
      });
      return options;
    },
  },

  mounted() {
    this.recreateChart();
  },

  methods: {
    onResize(chart, { width, height }) {
      this.$emit('resize', { width, height }, chart);
    },
    /**
     * Helper function, can be called by external components
     * to get the charts legend.
     */
    generateLegend() {
      if (this.chartObj) {
        return this.chartObj.generateLegend();
      }
      return null;
    },
    /**
     * Create a new chartjs instance based on the props.
     * - Destroys any old instance
     */
    recreateChart() {
      if (this.chartObj) {
        this.chartObj.destroy();
        this.$emit('chart:destroy');
      }

      this.chartObj = new Chart(
        this.$refs.canvas.getContext('2d'), {
          type: chartTypeAliases[this.type] || this.type,
          data: this.data,
          options: this.overriddenOptions,
          plugins: this.plugins || {},
        },
      );

      this.$emit('chart:render');
    },
  },

  /**
   * Vue function called when this
   * component is destroyed.
   */
  beforeDestroy() {
    if (this.chartObj) {
      this.chartObj.destroy();
    }
  },

  watch: {
    type() {
      this.recreateChart();
    },
    options() {
      // supports updates https://www.chartjs.org/docs/latest/developers/updates.html
      this.chartObj.options = this.overriddenOptions;
      // call update(0) instead to disable animations.
      this.chartObj.update();
    },
    plugins() {
      this.recreateChart();
    },
    /**
     * Modified from vue-chartjs
     * Logic weather to recreate or update an existing chartjs instance.
     */
    data(newData, oldData) {
      // exit if there is nothing to update
      if (!oldData) {
        this.recreateChart();
        return; // Nested ifs are hard to read...
      }

      // Get new and old DataSet Labels
      const newDatasetLabels = newData.datasets.map((dataset) => dataset.label);
      const oldDatasetLabels = oldData.datasets.map((dataset) => dataset.label);

      // Stringify 'em for easier compare
      // TODO, this is inefficient?
      const oldLabels = JSON.stringify(oldDatasetLabels);
      const newLabels = JSON.stringify(newDatasetLabels);

      // exit if Labels are equal and if dataset length is equal
      if (newLabels !== oldLabels || oldData.datasets.length !== newData.datasets.length) {
        this.recreateChart();
        return; // Nested ifs are hard to read...
      }

      newData.datasets.forEach((dataset, i) => {
        // Get new and old dataset keys
        const oldDatasetKeys = Object.keys(oldData.datasets[i]);
        const newDatasetKeys = Object.keys(dataset);

        // Get keys that aren't present in the new data
        const deletionKeys = oldDatasetKeys.filter((key) => key !== '_meta' && newDatasetKeys.indexOf(key) === -1);

        // Remove outdated key-value pairs
        deletionKeys.forEach((deletionKey) => {
          delete this.chartObj.data.datasets[i][deletionKey];
        });

        // Update attributes individually to avoid re-rendering the entire chart
        for (const attribute in dataset) {
          if (Object.prototype.hasOwnProperty.call(dataset, attribute)) {
            this.chartObj.data.datasets[i][attribute] = dataset[attribute];
          }
        }
      });

      if (Object.prototype.hasOwnProperty.call(newData, 'labels')) {
        this.chartObj.data.labels = newData.labels;
        this.$emit('labels:update');
      }

      if (Object.prototype.hasOwnProperty.call(newData, 'xLabels')) {
        this.chartObj.data.xLabels = newData.xLabels;
        this.$emit('xlabels:update');
      }

      if (Object.prototype.hasOwnProperty.call(newData, 'yLabels')) {
        this.chartObj.data.yLabels = newData.yLabels;
        this.$emit('ylabels:update');
      }

      this.chartObj.update();
      this.$emit('chart:update');

      // end watch data
    },
  },
};

</script>


<style scoped lang="scss">
</style>
