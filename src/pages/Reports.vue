<template>
  <div id="reports">
    <Heading heading_text="Reports - API Request Example"></Heading>
    <p id="content"> This is just an example page </p>
    <p id="content"> {{ info }} </p>
  </div>
</template>

<script>
import axios from 'axios';
import Heading from '../components/Heading.vue';
import Chart from '../components/Chart.vue';

export default {
  name: 'Reports',
  components: {
    Heading,
    Chart,
  },
  data () {
    return {
      info: "Loading Content from: http://api.icndb.com/jokes/random. Please wait!"
    }
  },
  mounted () {
    axios
      .get('http://api.icndb.com/jokes/random')
      .then(response => {
        this.info = response.data.value.joke;
      })
      .catch(response => {
        this.info = "(Unable to load a joke) [Error]: " + response
      });
  }
};

</script>

<style>
#content {
  padding: 25px;
  color: #536c85;
}
</style>
