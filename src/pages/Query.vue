<template>
  <div id="query">
    <Heading heading_text="API Request Example"></Heading>
    <p> This is just an example page </p>
    <p v-bind:style="style"> {{ info }} </p>
    <Heading heading_text="Query Components"></Heading>
    <p>
      <template v-for="child in children">
        <component :is="child" :key="child.name"></component>
      </template>
    </p>
  </div>
</template>


<script>
import axios from 'axios';
import Heading from '../components/misc/Heading.vue';
import Chart from '../components/charts/chartjs/Chart.vue';
import QueryFilter from '../components/query/QueryFilter.vue';

export default {
  name: 'Query',
  components: {
    Heading,
    Chart,
  },
  data() {
    return {
      info: 'Loading Content from: http://api.icndb.com/jokes/random using Axios. Please wait!',
      style: {},
      children: [
        QueryFilter,
      ],
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
</style>
