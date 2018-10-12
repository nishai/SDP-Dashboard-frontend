<template>
  <!-- TODO: POPULATE BASED OFF DATA RATHER THAN HARD-CODED -->
  <!-- TODO: POPULATE BASED OFF DATA RATHER THAN HARD-CODED -->
  <!-- TODO: POPULATE BASED OFF DATA RATHER THAN HARD-CODED -->
  <!-- TODO: POPULATE BASED OFF DATA RATHER THAN HARD-CODED -->
  <!-- TODO: POPULATE BASED OFF DATA RATHER THAN HARD-CODED -->
  <!-- TODO: POPULATE BASED OFF DATA RATHER THAN HARD-CODED -->
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
        <ChartExampleLink
          desc="Race"
          chartType="pie"
          :src="doughnut"
        />
      </div>
      <div class="grid-item">
        <ChartExampleLink
          desc="Gender"
          chartType="pie"
          :src="pie2"
        />
      </div>
      <div class="grid-item">
        <ChartExampleLink
          desc="Nationality"
          chartType="pie"
          :src="pie1"
        />
      </div>
      <div class="grid-item">
        <ChartExampleLink
          desc="Home Language"
          chartType="pie"
          :src="pie3"
        />
      </div>
      <div class="grid-item">
        <ChartExampleLink
          desc="Demographics vs Marks"
          chartType="bar"
          :src="line2"
        />
      </div>
    </div>

    <div class="subheading">
      <h3>Marks</h3>
    </div>
    <div class="grid-container">
      <div class="grid-item">
        <ChartExampleLink
          desc="Pass rates by year"
          chartType="bar"
          :src="bar1"
        />
      </div>
      <div class="grid-item">
        <ChartExampleLink
          desc="Pass rates by faculty/course"
          chartType="bar"
          :src="bar3"
        />
      </div>
      <div class="grid-item">
        <ChartExampleLink
          desc="Bell curve"
          chartType="line"
          :src="bellcurve"
        />
      </div>
      <div class="grid-item">
        <ChartExampleLink
          desc="Progress outcome by faculty/course"
          chartType="bar"
          :src="bar2"
        />
      </div>
    </div>

    <div class="subheading">
      <h3>Class sizes</h3>
    </div>
    <div class="grid-container">
      <div class="grid-item">
        <ChartExampleLink
          desc="Class size vs pass rate"
          chartType="line"
          :src="line1"
        />
      </div>
      <div class="grid-item">
        <ChartExampleLink
          click="two"
          desc="Average class size by faculty/course"
          chartType="bar"
          :src="bar1"
        />
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
