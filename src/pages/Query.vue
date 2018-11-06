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
    <div>
      <h3> Query 01 </h3>
      <p>{{ query01 }}</p>
    </div>
    <div>
      <h3> Query 02 </h3>
      <p>{{ query02 }}</p>
    </div>
    <div>
      <h3> Query 03 </h3>
      <p>{{ query03 }}</p>
    </div>
    <div>
      <h3> Query 04 </h3>
      <p>{{ query04 }}</p>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import Heading from '../components/misc/Heading.vue';
import Chart from '../components/charts/chartjs/Chart.vue';
import QueryFilter from '../components/query/QueryFilter.vue';
import { QuerysetFactory as Q } from '../api/queryset';

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
      query01: null,
      query02: null,
      query03: null,
      query04: null,
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


    Q.school().all().POST()
      .then((response) => {
        this.query01 = response.data;
      })
      .catch((response) => {
        this.query01 = 'FAILED';
      });

    Q.faculty().all().POST()
      .then((response) => {
        this.query02 = response.data;
      })
      .catch((response) => {
        this.query02 = 'FAILED';
      });

    Q.course().all().POST()
      .then((response) => {
        this.query03 = response.data;
      })
      .catch((response) => {
        this.query03 = 'FAILED';
      });

    Q.student().all().limit('first', 10, null).POST()
      .then((response) => {
        this.query03 = response.data;
      })
      .catch((response) => {
        this.query03 = 'FAILED';
      });
  },
};
</script>


<style>
</style>
