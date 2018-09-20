<template>
  <div class="chart_link_bounds">
    <router-link class="chart_link" :to="{path: '/examples', query: {templateType: url}}">
      <img :src="url" alt="chart" width="120" >
      <div class="chart_link_text"> {{ text }} </div>
    </router-link>
  </div>
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
.chart_link_bounds {
  width: calc(120px + 10px*2);
}

.chart_link {
  text-decoration: none;
  display: inline-block;
  padding: 10px;
  /* border */
  border-width: 1px;
  border-style: dashed;
  border-radius: 7px;
  border-color: rgba(0,0,0,0); /* invisible */
}

.chart_link:hover {
  font-weight: bold;
  /* border */
  border-color: var(--border-color);
}

.chart_link_text {
  color: #536c85;
  text-align: center;
  font-size: 16px;
}
</style>
