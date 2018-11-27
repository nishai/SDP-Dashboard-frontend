
<!--
Simple implementation of a bulma-breadcrumb:
https://bulma.io/documentation/components/breadcrumb/#

has three props:
  items: {name, to?, icon?, iconPack?}
  size: undefined/'is-small'/'is-medium'/'is-large'
  separator: undefined/'has-succeeds-separator'/'has-dot-separator'/'has-bullet-separator'/'has-arrow-separator'
-->

<template>
  <nav :class="['breadcrumb', {[separator]: !!separator, [size]: !!size}]" aria-label="breadcrumbs">
    <ul>
      <li v-for="(item, i) in items" :key="'crumb_'+i">
        <router-link :to="item.to ? item.to : ''">
          <b-icon v-if="item.icon" :type="item.iconPack" :icon="item.icon" :size="size"/>
          <span> {{ item.name ? item.name : item }} </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'b-breadcrumb',
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    size: {
      type: String,
      default: undefined, // between small and medium
      validator: (val) => [undefined, 'is-small', 'is-medium', 'is-large'].includes(val),
    },
    separator: {
      type: String,
      default: undefined, // forward slash
      validator: (val) => [undefined, 'has-succeeds-separator', 'has-dot-separator', 'has-bullet-separator', 'has-arrow-separator'].includes(val),
    },
  },
};
</script>

<style scoped>

</style>
