<template>
  <transition name="fade">
    <div class="sidebar border-right">
      <div class="sidebar_nav d-flex flex-column">
        <div class="sidebar_nav_group sidebar_nav_heading">
          <img class="img-fluid" src="img/logo/wits-logo-white.png"/>
        </div>
        <div  class="sidebar_nav_group d-flex flex-column" v-for="item in links" :key="item.path">
          <router-link class="sidebar_nav_link" :to="{name: item.name, query: item.query}" > {{ item.name }} </router-link>
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
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
  width: calc(var(--sidebar-width));
  height: 100vh;
  background-color: var(--bg-color-sidebar);
  color: var(--text-color-sidebar);
}

.sidebar_nav {
  font-size: var(--font-size-sidebar);
}

.sidebar_nav_heading {
  color: var(--text-color-sidebar-heading);
  background-color: var(--bg-color-sidebar-light);
  font-weight: bold;
  padding: 15px 20px;
  text-transform: uppercase;
}

.sidebar_nav_group {
  flex-grow: 1;
}

.sidebar_nav_link {
  color: var(--text-color-sidebar);
  font-size: var(--font-size-sidebar);
  text-decoration: none;
  padding: 10px 20px;
  flex-grow: 1;
}

.sidebar_nav_link:hover {
  color: var(--text-color-sidebar);
  background-color: var(--bg-color-sidebar-dark);
  font-weight: bold;
  text-decoration: none;
}

/* automatically added by the router to any <router-link> */
.router-link-active {}

/* automatically added by the router to any <router-link> */
.router-link-exact-active {
  color: var(--text-color-sidebar);
  background-color: var(--bg-color-sidebar-dark);
  font-weight: bold;
  text-decoration: none;
}

</style>
