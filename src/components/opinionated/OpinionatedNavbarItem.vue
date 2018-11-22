
<!--
Simple stylized implementation of the navbar from:
https://bulma.io/documentation/components/navbar/

Has three properties:
  to?:    router link
  icon?:  icon name
  name:   label
-->

<template>
  <BulmaNavbarItem :to="item.to">
    <b-icon v-if="icon" :icon="icon"/>
    <span v-if="name"> {{ name }} </span>
  </BulmaNavbarItem>
</template>

<script>
import BulmaNavbarItem from '../global/BulmaNavbarItem.vue';

export default {
  name: 'OpinionatedNavbarItem',
  components: {
    BulmaNavbarItem,
  },
  props: {
    to: String,
    icon: String,
    name: String,
  },
};
</script>

<style scoped>
</style>
