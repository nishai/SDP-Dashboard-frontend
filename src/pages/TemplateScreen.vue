<template>
  <div id="templates">
    <Heading heading_text="Template Charts"></Heading>
    <div id="subheading">
      Demographics
    </div>

    <div class="grid-container">
      <div class="grid-item">
        <TemplateTypes click="one" text="Race" v-bind:url="url2"></TemplateTypes>
      </div>
      <div class="grid-item">
        <TemplateTypes click="two" text="Gender" v-bind:url="url2"></TemplateTypes>
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
      url1: require('../images/bar.png'),
      url2: require('../images/pie.png'),
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
  padding: 35px;
  color: #536c85;
  font-size: 25px;
}
.grid-container {
  display: inline-grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}
.grid-item {
  padding: 20px;
  font-size: 20px;
  text-align: center;
}
</style>
