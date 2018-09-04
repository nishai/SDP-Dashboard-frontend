<template>
  <div id="dashboard">
    <Heading heading_text="Example Dashboard"></Heading>
    <p id="content"> This is just an example page </p>
    <Chart></Chart>
    <Button id="super" @click="superimpose">Superimpose</Button>
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
  methods: {
    superimpose(event) {
      const new_dataset = {
        data: [55, 8, 12, 18, 7],
        backgroundColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      };

      Chart.data().chart_data.data.datasets.push(new_dataset);
      console.log(Chart.data().chart_data.data.datasets);
      document.getElementById('super').disabled = true;
    },
  },
};
</script>

<style>
#content {
  padding: 25px;
  color: #536c85;
}
</style>
