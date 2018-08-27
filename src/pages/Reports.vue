<template>
  <div id="reports">
    <Heading heading_text="Example Chart"></Heading>
    <p id="content"> This is just an example page </p>
    <Chart></Chart>
  </div>
</template>

<script>
import Heading from '../components/Heading.vue';
import Chart from '../components/Chart.vue';

export default {
  name: 'Reports',
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
