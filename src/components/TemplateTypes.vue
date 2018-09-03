<template>
  <div id="type">
    <img :src="url" alt="chart" width="256">
    <p id="content"> {{ text }} </p>
  </div>
</template>

<script>

export default {
  name: 'TemplateTypes',
  props: ['url', 'text'],
};
</script>

<style>
#content {
  padding: 25px;
  color: #536c85;
}
</style>
