<template>
  <!-- d-footer defined in _style.scss-->
  <div class="footer d-footer">
    <div class="content has-text-right">
        Dashboard by <router-link to="/about"> Team Potato </router-link> <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank"> 🥔 </a> {{ year }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardContentFooter',
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped lang="scss">
</style>
