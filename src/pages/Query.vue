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
      <p>{{ json01 }}</p>
      <p>{{ query01 }}</p>
    </div>
    <div>
      <h3> Query 02 </h3>
      <p>{{ json02 }}</p>
      <p>{{ query02 }}</p>
    </div>
    <div>
      <h3> Query 03 </h3>
      <p>{{ json03 }}</p>
      <p>{{ query03 }}</p>
    </div>
    <div>
      <h3> Query 04 </h3>
      <p>{{ json04 }}</p>
      <p>{{ query04 }}</p>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import Heading from '../components/misc/Heading.vue';
import Chart from '../components/charts/chartjs/Chart.vue';
import QueryFilter from '../components/query/QueryFilter.vue';
import { QuerysetFactory, Q } from '../assets/js/api/queryset';

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
      json01: null,
      json02: null,
      json03: null,
      json04: null,
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


    const q01 = QuerysetFactory.school().limit('first', 10);

    this.json01 = q01.data;
    q01.POST()
      .then((response) => {
        this.query01 = response.data;
      })
      .catch((response) => {
        this.query01 = 'FAILED';
      });

    const q02 = QuerysetFactory.faculty().limit('first', 10);

    this.json02 = q02.data;
    q02.POST()
      .then((response) => {
        this.query02 = response.data;
      })
      .catch((response) => {
        this.query02 = 'FAILED';
      });

    const q03 = QuerysetFactory.course()
      .filter(new Q('school_id__faculty_title__icontains', 'science')
        .or('school_id__faculty_title__icontains', 'art')
        .and('school_id__faculty_title__icontains', 'arts').not())
      .limit('first', 10);

    this.json03 = q03.data;
    q03.POST()
      .then((response) => {
        this.query03 = response.data;
      })
      .catch((response) => {
        this.query03 = 'FAILED';
      });

    const q04 = QuerysetFactory.student().limit('first', 10);

    this.json04 = q04.data;
    q04.POST()
      .then((response) => {
        this.query04 = response.data;
      })
      .catch((response) => {
        this.query04 = 'FAILED';
      });
  },
};
</script>


<style>
</style>
