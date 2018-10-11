<template>
  <div id="templates">
    <Heading heading_text="Template Charts"></Heading>

    <div id="check" class="d-none">
      <input type="checkbox" value="always_show" checked> Always show this page on login<br>
    </div>

    <div class="subheading">
      <h3>Demographics</h3>
    </div>
    <div class="grid-container">
      <div class="grid-item">
        <ChartExampleLink text="Race" v-bind:url="doughnut"></ChartExampleLink>
      </div>
      <div class="grid-item">
        <ChartExampleLink text="Gender" v-bind:url="pie2"></ChartExampleLink>
      </div>
      <div class="grid-item">
        <ChartExampleLink text="Nationality" v-bind:url="pie1"></ChartExampleLink>
      </div>
      <div class="grid-item">
        <ChartExampleLink text="Home Language" v-bind:url="pie3"></ChartExampleLink>
      </div>
      <div class="grid-item">
        <ChartExampleLink text="Demographics vs Marks" v-bind:url="line2"></ChartExampleLink>
      </div>
    </div>

    <div class="subheading">
      <h3>Marks</h3>
    </div>
    <div class="grid-container">
      <div class="grid-item">
        <ChartExampleLink text="Pass rates by year" v-bind:url="bar1"></ChartExampleLink>
      </div>
      <div class="grid-item">
        <ChartExampleLink
        text="Pass rates by faculty/course" v-bind:url="bar3"></ChartExampleLink>
      </div>
      <div class="grid-item">
        <ChartExampleLink text="Bell curve" v-bind:url="bellcurve"></ChartExampleLink>
      </div>
      <div class="grid-item">
        <ChartExampleLink
        text="Progress outcome by faculty/course" v-bind:url="bar2"></ChartExampleLink>
      </div>
    </div>

    <div class="subheading">
      <h3>Class sizes</h3>
    </div>
    <div class="grid-container">
      <div class="grid-item">
        <ChartExampleLink
        text="Class size vs pass rate" v-bind:url="line1"></ChartExampleLink>
      </div>
      <div class="grid-item">
        <ChartExampleLink click="two"
        text="Average class size by faculty/course" v-bind:url="bar1"></ChartExampleLink>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable global-require */
import Heading from '../components/misc/Heading.vue';
import ChartExampleLink from '../components/charts/ChartExampleLink.vue';

export default {
  name: 'ChartTemplates',
  components: {
    Heading,
    ChartExampleLink,
  },
  data() {
    return {
      bar1: require('../../public/img/charts/bar1.png'),
      bar2: require('../../public/img/charts/bar2.png'),
      bar3: require('../../public/img/charts/bar3.png'),
      pie1: require('../../public/img/charts/pie1.png'),
      pie2: require('../../public/img/charts/pie2.png'),
      pie3: require('../../public/img/charts/pie3.png'),
      line1: require('../../public/img/charts/line1.png'),
      line2: require('../../public/img/charts/line2.png'),
      bellcurve: require('../../public/img/charts/bell-curve.png'),
      doughnut: require('../../public/img/charts/doughnut.png'),
    };
  },
};
/* eslint-disable global-require */
</script>

<style>
.subheading {
  padding-left: 35px;
  color: #536c85;
  /* font-size: 25px; */
}

#check {
  top: 10px;
  right: 10px;
  position: absolute;
  color: #2c3e50;
  font-size: 16px;
}

.grid-container {
  grid-template-columns: 150px 150px 150px 150px 150px ;
  padding-left: 30px;
  /* alignment */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.grid-item {
  padding: 10px;
  font-size: 20px;
  text-align: center;
}
</style>
