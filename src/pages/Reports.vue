<template>
  <div id="reports">
    <Heading heading_text="Reports - API Request Example"></Heading>
    <p class="content"> This is just an example page </p>
    <p class="content" v-bind:style="style"> {{ info }} </p>
  </div>
</template>


<script>
import axios from 'axios';
import Heading from '../components/Heading.vue';
import Chart from '../components/chart/Chart.vue';

export default {
  name: 'Reports',
  components: {
    Heading,
    Chart,
  },
  data() {
    return {
      info: 'Loading Content from: http://api.icndb.com/jokes/random using Axios. Please wait!',
      style: {},
    };
  },
  mounted() {
    axios
      .get('http://api.icndb.com/jokes/random')
      .then((response) => {
        this.info = response.data.value.joke;
        this.style.color = 'green';
      })
      .catch((response) => {
        this.info = `(Unable to load a joke using Axios) [Error]: ${response}`;
        this.style.color = 'red';
      });
  },
};
</script>


<style>
.content {
  padding: 25px;
  color: #536c85;
}
</style>
