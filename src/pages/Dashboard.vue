<template>
  <div id="dashboard">
      <Heading heading_text="Example Dashboard"></Heading>
      <p id="content"> This is just an example page </p>
      <Chart></Chart>
      <Table v-if="add_table"></Table>
      <Button v-on:click="add_table = !add_table">Add Table</Button>
  </div>
</template>

<script>
import Heading from '../components/Heading.vue';
import Chart from '../components/Chart.vue';
import Table from '../components/Table.vue';

export default {
  name: 'Dashboard',
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
  #content {
    padding: 25px;
    color: #536c85;
  }
</style>
