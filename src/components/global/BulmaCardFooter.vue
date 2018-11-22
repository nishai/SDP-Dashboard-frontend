
<!--
Simple implementation of a bulma-card-footer:
https://bulma.io/documentation/components/card/#

Intended to be nested directly under a bulma-card

has one prop:
  - items: [{label: string, to?: string, icon?: string, onClick?: () => {})}]
-->

<template>
  <footer class="card-footer">
    <slot/>
    <template v-if="items" v-for="(item, i) in items">
      <router-link v-if="item.to" :to="item.to" :key="i" class="card-footer-item">
        {{ item.label ? item.label : "~missing label" }}
      </router-link>
      <p v-else :key="i" class="card-footer-item" @click="item.onClick">
        {{ item.label ? item.label : "~missing label" }}
      </p>
    </template>
  </footer>
</template>

<script>
export default {
  name: 'b-card-footer',
  props: {
    items: null,
  },
};
</script>

<style scoped lang="scss">
</style>
