
<!--
Layout css from: https://codepen.io/ilanf/details/ybNVwg/
-->

<template>
<div class="h-expander" style="min-height: 100vh">
  <MainNavbar/>
  <div class="h-expand">
    <router-view class="h-expanded"/>
  </div>
  <MainFooter/>
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
