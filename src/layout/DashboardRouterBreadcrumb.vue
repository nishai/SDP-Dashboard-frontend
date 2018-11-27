
<!--
Extension of BulmaBreadcrumb to work with vue-router.
https://medium.com/@fagnersaraujo/automated-breadcrumbs-with-vuejs-7e1051de8028

Displays if a route has
  meta.breadcrumb: []      defined.
  each entry traks the form of the items defined for: BulmaBreadcrumb.

extends two props from BulmaBreadcrumb, except now with defaults:
  size
  separator
-->

<template>
  <b-breadcrumb
    v-if="$route.meta.breadcrumb"
    :items="$route.meta.breadcrumb"
    :size="size"
    :separator="separator"
  />
</template>

<script>
export default {
  name: 'DashboardRouterBreadcrumb',
  props: {
    size: {
      type: String,
      default: undefined,
    },
    separator: {
      type: String,
      default: 'has-arrow-separator',
    },
  },
};
</script>

<style scoped>
</style>
