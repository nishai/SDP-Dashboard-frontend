<!--
Implementation of: https://bulma.io/documentation/components/menu/
-->


<template>
  <nav class="menu">
      <template v-for="(section, i) in sections">
        <!-- list heading -->
        <p class="menu-label" :key="'label'+i">
          {{ section.name }}
        </p>
        <!-- list entries -->
        <ul class="menu-list" :key="'list'+i">
          <li v-for="(route, j) in section.routes" :key="i+'-'+j">
            <router-link :to="route.to">
              <div class="image is-32x32 is-pulled-left">
                <b-icon v-if="route.icon" :type="route.type" :icon="route.icon" size="is-small"></b-icon>
              </div>
              <div class="has-text-left has-text-nowrap">{{ route.name }}</div>
            </router-link>
          </li>
        </ul>
        <!-- end: list entries -->
      </template>
  </nav>
</template>

<script>
import { getDefaultSidebarSections } from '../assets/js/defaults';

export default {
  name: 'DashboardSidebar',
  props: {
    sections: {
      default: getDefaultSidebarSections,
    },
  },
};
</script>

<style scoped lang="scss">
</style>
