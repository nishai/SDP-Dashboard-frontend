<template>
  <transition name="fade">
    <div class="sidebar border rounded-top">
      <div class="sidebar_nav">
        <div class="sidebar_nav_heading"> Navigate </div>
        <div v-for="item in links" :key="item.path" class="sidebar_nav_group">
          <b-link :to="{name: item.name, query: item.query}" class="sidebar_nav_link"> {{ item.name }} </b-link>
          <hr class="sidebar_divider"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<!-- SCRIPT -->

<script>
import { navRoutes } from '../../router/routes';

export default {
  name: 'Sidebar',
  data: () => ({
    links: navRoutes,
  }),
};
</script>

<!-- STYLE -->

<style>
.sidebar {
  /* position */
  position: fixed;
  left: 0;
  top: 0;
  /* size */
  margin: 15px 0 0 15px;
  width: calc(var(--sidebar-width) - 15px);
  height: 100vh;
  /* border */
  border-color: var(--border-color-sidebar);
}

.sidebar_nav {
  font-size: var(--font-size-sidebar);
  color: var(--text-color);
  display: block;
}

.sidebar_nav_heading {
  color: var(--heading-color);
  font-weight: bold;
  padding: 15px 20px;
}

.sidebar_nav_group {
  padding: 0px 20px;
}

.sidebar_nav_link {
  color: var(--link-color);
  font-size: var(--font-size-sidebar);
  text-decoration: none;
}

.sidebar_nav_link:hover {
  color: var(--link-color);
  font-weight: bold;
  text-decoration: none;
}

.sidebar_divider {
  margin: 0 0 16px 0;
  border-style: dotted;
}
</style>
