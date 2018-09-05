<template>
  <div id="templates">
    <Heading heading_text="Template Charts"></Heading>

    <div id="check">
      <input type="checkbox" value="always_show" checked> Always show this page on login<br>
    </div>

    <div id="subheading">
      <h3>Demographics</h3>
    </div>
    <div class="grid-container">
      <div class="grid-item">
        <TemplateTypes text="Race" v-bind:url="doughnut"></TemplateTypes>
      </div>
      <div class="grid-item">
        <TemplateTypes text="Gender" v-bind:url="pie2"></TemplateTypes>
      </div>
      <div class="grid-item">
        <TemplateTypes text="Nationality" v-bind:url="pie1"></TemplateTypes>
      </div>
      <div class="grid-item">
        <TemplateTypes text="Home Language" v-bind:url="pie3"></TemplateTypes>
      </div>
      <div class="grid-item">
        <TemplateTypes text="Demographics vs Marks" v-bind:url="line2"></TemplateTypes>
      </div>
    </div>

    <div id="subheading">
      <h3>Marks</h3>
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
      <h3>Class sizes</h3>
    </div>
    <div class="grid-container">
      <div class="grid-item">
        <TemplateTypes
        text="Class size vs pass rate" v-bind:url="line1"></TemplateTypes>
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
      bar1: require('../assets/bar1.png'),
      bar2: require('../assets/bar2.png'),
      bar3: require('../assets/bar3.png'),
      pie1: require('../assets/pie1.png'),
      pie2: require('../assets/pie2.png'),
      pie3: require('../assets/pie3.png'),
      line1: require('../assets/line1.png'),
      line2: require('../assets/line2.png'),
      bellcurve: require('../assets/bell-curve.png'),
      doughnut: require('../assets/doughnut.png'),
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
