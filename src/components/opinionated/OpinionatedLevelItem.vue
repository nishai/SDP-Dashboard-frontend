<!--
A an opinionated extension of the level-item from:
https://bulma.io/documentation/layout/level/

This component displays a label centered above a value.
If the value is null, it is replaced by a spinning loading icon.

Has two props:
  label: String
  value: null|string
-->

<template>
  <BulmaLevelItem centered>
    <div :class="{'box': boxed}">
      <p class="heading">
        {{ label }}
      </p>
      <p v-if="value !== null && value !== undefined" class="title">
        {{ value }}
      </p>
      <p v-else class="title loader"></p>
    </div>
  </BulmaLevelItem>
</template>

<script>
import BulmaLevelItem from '../global/BulmaLevelItem.vue';

export default {
  name: 'OpinionatedLevelItem',
  components: {
    BulmaLevelItem,
  },
  props: {
    label: String,
    value: null,
    boxed: Boolean,
  },
};
</script>

<style>
</style>
