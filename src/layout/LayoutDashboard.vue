
<!--
Layout css from: https://codepen.io/ilanf/details/ybNVwg/
-->

<template>
  <div class="columns" style="margin: 0">
    <aside class="column is-1 is-paddingless sidebar-container">
      <div class="section has-side-padding">
        <DashboardSidebar/>
      </div>
    </aside>
    <main class="column is-paddingless h-expander">
      <div class="section has-side-padding h-expand">
        <DashboardRouterBreadcrumb/>
        <transition name="fade">
          <router-view class="h-expanded"></router-view>
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import DashboardRouterBreadcrumb from './DashboardRouterBreadcrumb.vue';
import DashboardSidebar from './DashboardSidebar.vue';

export default {
  name: 'LayoutDashboard',
  components: {
    DashboardRouterBreadcrumb,
    DashboardSidebar,
  },
  data() {
    return {
      isSidebarOpen: true,
    };
  },
};
</script>

<style scoped>

.sidebar-container {
  border-right: 1px dotted #eeeeee;
  min-width: 220px;
}

</style>
