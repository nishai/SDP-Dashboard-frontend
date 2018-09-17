<template>
  <router-link id="link" :to="{path: '/examples', query: {templateType: url}}">
    <div id="type" >
      <img :src="url" alt="chart" width="120" >
      <p id="content"> {{ text }} </p>
    </div>
  </router-link>
</template>

<script>

export default {
  name: 'ChartExampleLink',
  props: [
    'url',
    'text',
  ],
};
</script>

<style>
#link {
  text-decoration: none;
}
#link:hover {
  font-weight: bold;
}
#content {
  color: #536c85;
  text-align: center;
  font-size: 16px;
}

</style>
