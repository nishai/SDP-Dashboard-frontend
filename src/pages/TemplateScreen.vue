<template>
  <div id="templates">
    <Heading heading_text="Template Charts"></Heading>

    <div id="check">
      <input type="checkbox" value="always_show" checked> Always show this page on login<br>
    </div>

    <div id="subheading">
      Demographics
    </div>
    <div class="grid-container">
      <div class="grid-item">
        <TemplateTypes text="Race" v-bind:url="doughnut"></TemplateTypes>
      </div>
      <div class="grid-item">
        <TemplateTypes text="Gender" v-bind:url="pie1"></TemplateTypes>
      </div>
      <div class="grid-item">
        <TemplateTypes text="Nationality" v-bind:url="pie2"></TemplateTypes>
      </div>
      <div class="grid-item">
        <TemplateTypes text="Home Language" v-bind:url="pie3"></TemplateTypes>
      </div>
      <div class="grid-item">
        <TemplateTypes text="Demographics vs Marks" v-bind:url="line2"></TemplateTypes>
      </div>
    </div>

    <div id="subheading">
      Marks
    </div>
    <div class="grid-container">
      <div class="grid-item">
        <TemplateTypes text="Pass rates by year" v-bind:url="bar1"></TemplateTypes>
      </div>
      <div class="grid-item">
        <TemplateTypes
        text="Pass rates by faculty/course" v-bind:url="bar3"></TemplateTypes>
      </div>
      <div class="grid-item">
        <TemplateTypes text="Bell curve" v-bind:url="bellcurve"></TemplateTypes>
      </div>
      <div class="grid-item">
        <TemplateTypes
        text="Progress outcome by faculty/course" v-bind:url="bar2"></TemplateTypes>
      </div>
    </div>

    <div id="subheading">
      Class sizes
    </div>
    <div class="grid-container">
      <div class="grid-item">
        <TemplateTypes
        text="Class size vs pass rate" v-bind:url="line2"></TemplateTypes>
      </div>
      <div class="grid-item">
        <TemplateTypes click="two"
        text="Average class size by faculty/course" v-bind:url="bar1"></TemplateTypes>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable global-require */
import Heading from '../components/Heading.vue';
import TemplateTypes from '../components/TemplateTypes.vue';

export default {
  name: 'TemplateScreen',
  components: {
    Heading,
    TemplateTypes,
  },
  data() {
    return {
      bar1: require('../images/bar1.png'),
      bar2: require('../images/bar2.png'),
      bar3: require('../images/bar3.png'),
      pie1: require('../images/pie1.png'),
      pie2: require('../images/pie2.png'),
      pie3: require('../images/pie3.png'),
      line1: require('../images/line1.png'),
      line2: require('../images/line2.png'),
      bellcurve: require('../images/bell-curve.png'),
      doughnut: require('../images/doughnut.png'),
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
#subheading {
  padding-left: 35px;
  color: #536c85;
  font-size: 25px;
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
  grid-template-columns: 200px 200px 200px 200px 200px ;
  padding: 10px;
}
.grid-item {
  padding: 20px;
  font-size: 20px;
  text-align: center;
}
.grid-item:hover {
  height: 150px;
  width: 150px;
  border-radius: 0px;
  background: #ffffff;
  box-shadow: 0 0 10px #5f6b7a;
}
</style>
