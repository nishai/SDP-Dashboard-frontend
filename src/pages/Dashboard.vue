<template>
  <div id="dashboard">
    <Heading heading_text="Example Dashboard"></Heading>
    <p id="content"> This is just an example page </p>
    <Chart v-if="this.$route.query.templateType === '' ||
    this.$route.query.templateType.includes('doughnut')" type="doughnut"></Chart>
    <Chart v-if="this.$route.query.templateType === '' ||
    this.$route.query.templateType.includes('line') ||
    this.$route.query.templateType.includes('bell')" type="line"></Chart>
    <Chart v-if="this.$route.query.templateType === '' ||
    this.$route.query.templateType.includes('data')" type="bar"></Chart>
    <Chart v-if="this.$route.query.templateType === '' ||
    this.$route.query.templateType.includes('pie')" type="pie"></Chart>
    <Chart v-if="this.$route.query.templateType === '' ||
    this.$route.query.templateType.includes('radar')" type="radar"></Chart>
    <Chart v-if="this.$route.query.templateType === '' ||
    this.$route.query.templateType.includes('polar')" type="polar"></Chart>
    <Chart v-if="this.$route.query.templateType === '' ||
    this.$route.query.templateType.includes('bubble')" type="bubble"></Chart>
    <Chart v-if="this.$route.query.templateType === '' ||
    this.$route.query.templateType.includes('scatter')" type="scatter"></Chart>
    <Button id="tableButton" v-on:click="add_table = true">Add Table</Button>
    <Table v-if="add_table"></Table>
    <Button id="listButton" v-on:click="add_list = true">Add List</Button>
    <List v-if="add_list"></List>
  </div>
</template>

<script>
import Heading from '../components/Heading.vue';
import Chart from '../components/charts/Chart.vue';
import Table from '../components/charts/Table.vue';
import List from '../components/List.vue';

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
    List,
  },
};
</script>

<style>
  #content {
    padding: 25px;
    color: #536c85;
  }
</style>
