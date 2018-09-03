<template>
  <router-link :to="'/dashboard'">
  <div id="type" >
    <img :src="url" alt="chart" width="256" height="256">
    <p id="content"> {{ text }} </p>
  </div>
  </router-link>
</template>

<script>

export default {
  name: 'TemplateTypes',
  props: ['url', 'text', 'click'],
};
</script>

<style>
#content {
  padding: 25px;
  color: #536c85;
}
</style>
