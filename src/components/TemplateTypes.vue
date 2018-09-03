<template>
  <router-link :to="'/dashboard'">
  <div id="type" >
    <img :src="url" alt="chart" width="150" >
    <p id="content"> {{ text }} </p>
  </div>
  </router-link>
</template>

<script>

export default {
  name: 'TemplateTypes',
  props: ['url', 'text'],
};
</script>

<style>
#content {
  color: #536c85;
  text-align: center;
  font-size: 20px;
}
</style>
