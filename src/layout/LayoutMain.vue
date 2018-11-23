
<!--
Layout css from: https://codepen.io/ilanf/details/ybNVwg/
-->

<template>
<div class="h-expander" style="min-height: 100vh">
  <MainNavbar/>
  <div class="h-expanded h-expander">
    <router-view class="h-expanded"/>
  </div>
  <MainFooter/>
  <!-- https://vue2-slideout-panel.wrkflows.io/en/articles/1001 -->
  <slideout-panel/>
</div>
</template>

<script>
import MainNavbar from './MainNavbar.vue';
import MainFooter from './MainFooter.vue';

export default {
  name: 'LayoutDashboard',
  components: {
    MainNavbar,
    MainFooter,
  },
};
</script>

<style scoped lang="scss">
</style>
