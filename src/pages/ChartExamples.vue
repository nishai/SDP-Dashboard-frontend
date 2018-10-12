<template>
  <div class="dashboard">
    <Heading heading_text="Example Dashboard"></Heading>
    <!-- TODO: TURN INTO SINGULAR COMPONENT, WITH PROPS -->
    <!-- TODO: TURN INTO SINGULAR COMPONENT, WITH PROPS -->
    <!-- TODO: TURN INTO SINGULAR COMPONENT, WITH PROPS -->
    <!-- TODO: TURN INTO SINGULAR COMPONENT, WITH PROPS -->
    <!-- TODO: TURN INTO SINGULAR COMPONENT, WITH PROPS -->
    <div class="d-flex flex-wrap justify-content-between">
      <Chart
        class="example_chart_size"
        v-if="this.$route.query.templateType === '' ||
        this.$route.query.templateType.includes('doughnut')"
        :chartData="this.$route.query.data"
        type="doughnut">
      </Chart>
      <Chart
        class="example_chart_size"
        v-if="this.$route.query.templateType === '' ||
        this.$route.query.templateType.includes('line') ||
        this.$route.query.templateType.includes('bell')"
        :chartData="this.$route.query.data"
        type="line">
      </Chart>
      <Chart
        class="example_chart_size"
        v-if="this.$route.query.templateType === '' ||
        this.$route.query.templateType.includes('data')"
        :chartData="this.$route.query.data"
        type="bar">
      </Chart>
      <Chart
        class="example_chart_size"
        v-if="this.$route.query.templateType === '' ||
        this.$route.query.templateType.includes('pie')"
        :chartData="this.$route.query.data"
        type="pie">
      </Chart>
      <Chart
        class="example_chart_size"
        v-if="this.$route.query.templateType === '' ||
        this.$route.query.templateType.includes('radar')"
        :chartData="this.$route.query.data"
        type="radar">
      </Chart>
      <Chart
        class="example_chart_size"
        v-if="this.$route.query.templateType === '' ||
        this.$route.query.templateType.includes('polar')"
        :chartData="this.$route.query.data"
        type="polar">
      </Chart>
      <Chart
        class="example_chart_size"
        v-if="this.$route.query.templateType === '' ||
        this.$route.query.templateType.includes('bubble')"
        :chartData="this.$route.query.data"
        type="bubble">
      </Chart>
      <Chart
        class="example_chart_size"
        v-if="this.$route.query.templateType === '' ||
        this.$route.query.templateType.includes('scatter')"
        :chartData="this.$route.query.data"
        type="scatter">
      </Chart>
      <div>
        <Button id="tableButton" v-on:click="add_table = true">Add Table</Button>
        <Table v-if="add_table"></Table>
      </div>
      <div>
        <Button id="listButton" v-on:click="add_list = true">Add List</Button>
        <List v-if="add_list"></List>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '../components/misc/Heading.vue';
import Chart from '../components/charts/chartjs/Chart.vue';
import Table from '../components/charts/chartjs/Table.vue';
import List from '../components/charts/chartjs/List.vue';

export default {
  name: 'ChartExamples',
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
    List,
  },
};
</script>

<style>
.example_chart_size {
  width: 300px;
  margin: 15px;
}
</style>
