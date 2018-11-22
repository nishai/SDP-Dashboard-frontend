
<!--
Simple implementation of level-items from:
https://bulma.io/documentation/layout/level/

Specify the 'centered' property to center text.

This should be used to surround all element placed inside a level.
-->

<template>
  <div :class="['level-item', {'has-text-centered': centered}]">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'b-level-item',
  props: {
    // if the content should be centered.
    centered: Boolean,
  },
};
</script>

<style scoped lang="scss">
</style>
