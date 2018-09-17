<template>
  <div id="templates">
    <Heading heading_text="Template Charts"></Heading>

    <div id="check">
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
import Heading from '../components/Heading.vue';
import ChartExampleLink from '../components/ChartExampleLink.vue';

export default {
  name: 'ChartTemplates',
  components: {
    Heading,
    ChartExampleLink,
  },
  data() {
    return {
      bar1: require('../assets/images/charts/bar1.png'),
      bar2: require('../assets/images/charts/bar2.png'),
      bar3: require('../assets/images/charts/bar3.png'),
      pie1: require('../assets/images/charts/pie1.png'),
      pie2: require('../assets/images/charts/pie2.png'),
      pie3: require('../assets/images/charts/pie3.png'),
      line1: require('../assets/images/charts/line1.png'),
      line2: require('../assets/images/charts/line2.png'),
      bellcurve: require('../assets/images/charts/bell-curve.png'),
      doughnut: require('../assets/images/charts/doughnut.png'),
    };
  },
};
/* eslint-disable global-require */
</script>

<style>
#content {
  padding: 25px;
  color: #536c85;
}

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
  display: inline-grid;
  grid-template-columns: 150px 150px 150px 150px 150px ;
  padding-left: 30px;
}
.grid-item {
  padding: 10px;
  font-size: 20px;
  text-align: center;
}
.grid-item:hover {
  height: 120px;
  width: 120px;
  background: whitesmoke;
  border-radius: 5px;
}
</style>
