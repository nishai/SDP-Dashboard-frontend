<template>
  <div class="dashboard">
    <Heading heading_text="Example Dashboard"></Heading>
    <div class="d-flex flex-wrap justify-content-between">
      <Chart class="example_chart_size" v-if="this.$route.query.templateType === '' ||
      this.$route.query.templateType.includes('doughnut')" type="doughnut"></Chart>
      <Chart class="example_chart_size" v-if="this.$route.query.templateType === '' ||
      this.$route.query.templateType.includes('line') ||
      this.$route.query.templateType.includes('bell')" type="line"></Chart>
      <Chart class="example_chart_size" v-if="this.$route.query.templateType === '' ||
      this.$route.query.templateType.includes('data')" type="bar"></Chart>
      <Chart class="example_chart_size" v-if="this.$route.query.templateType === '' ||
      this.$route.query.templateType.includes('pie')" type="pie"></Chart>
      <Chart class="example_chart_size" v-if="this.$route.query.templateType === '' ||
      this.$route.query.templateType.includes('radar')" type="radar"></Chart>
      <Chart class="example_chart_size" v-if="this.$route.query.templateType === '' ||
      this.$route.query.templateType.includes('polar')" type="polar"></Chart>
      <Chart class="example_chart_size" v-if="this.$route.query.templateType === '' ||
      this.$route.query.templateType.includes('bubble')" type="bubble"></Chart>
      <Chart class="example_chart_size" v-if="this.$route.query.templateType === '' ||
      this.$route.query.templateType.includes('scatter')" type="scatter"></Chart>
      <div>
        <Button id="tableButton" v-on:click="add_table = true">Add Table</Button>
        <Table v-if="add_table"></Table>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '../components/misc/Heading.vue';
import Chart from '../components/charts/chartjs/Chart.vue';
import Table from '../components/charts/chartjs/Table.vue';

export default {
  name: 'ChartExamples',
  data() {
    return {
      add_table: false,
    };
  },
  components: {
    Heading,
    Chart,
    Table,
  },
};
</script>

<style>
.example_chart_size {
  width: 300px;
  margin: 15px;
}
</style>
