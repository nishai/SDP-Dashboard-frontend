
<!--
Simple implementation of a bulma level:
https://bulma.io/documentation/layout/level/

has three slots (each item in the slot must have the class level-item):
  right:             right side of level
  left:              left side of level
  default (unnamed): centered in the level
-->

<template>
  <nav class="level">
    <!-- left -->
    <div class="level-left">
      <slot name="left"/>
    </div>
    <!-- center -->
    <slot/>
    <!-- right -->
    <div class="level-right">
      <slot name="right"/>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'b-level',
};
</script>

<style scoped lang="scss">
</style>
