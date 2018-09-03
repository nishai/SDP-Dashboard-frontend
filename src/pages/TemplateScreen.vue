<template>
  <div id="templates">
    <Heading heading_text="Template Charts"></Heading>
    <TemplateTypes text="this one" v-bind:url="url1"></TemplateTypes>
    <TemplateTypes text="this one also" v-bind:url="url2"></TemplateTypes>
    <p id="content"> test </p>
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
      url2: require('../images/pie.jpg'),
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
</style>
