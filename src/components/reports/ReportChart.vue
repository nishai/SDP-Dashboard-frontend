<template>
  <div>
    <b-card no-body>
      <!-- Heading -->
      <div slot="header" class="d-flex justify-content-between">
        <h4 class="mb-1"> {{ chart.name }} </h4>
        <small class="text-muted"> type: {{ chart.type }} </small>
      </div>
      <!-- Chart -->
      <b-card-body style="padding: 5px;">
        <Chart :type="chart.type"></Chart>
      </b-card-body>
      <!-- Info -->
      <b-card-footer> {{ details }} </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import Chart from '../charts/chartjs/Chart.vue';

export default {
  name: 'ReportChart',
  components: {
    Chart,
  },
  props: {
    id: {
      type: String,
    },
    chart: {
      type: Object,
    },
  },
  computed: {
    details() {
      return 'TODO: detials';
    },
  },
};
</script>

<style>
</style>
