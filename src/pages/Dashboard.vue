<template>
  <div id="dashboard">
    <Heading heading_text="Example Dashboard"></Heading>
    <p id="content"> This is just an example page </p>
    <Chart type="doughnut"></Chart>
    <Chart type="line"></Chart>
    <Chart type="bar"></Chart>
    <Chart type="pie"></Chart>
    <Chart type="radar"></Chart>
    <Chart type="polar"></Chart>
    <Chart type="bubble"></Chart>
    <Chart type="scatter"></Chart>
  </div>
</template>

<script>
import Heading from '../components/Heading.vue';
import Chart from '../components/Chart.vue';

export default {
  name: 'Dashboard',
  components: {
    Heading,
    Chart,
  },
};
</script>

<style>
#content {
  padding: 25px;
  color: #536c85;
}
</style>
