
<!--
Simple implementation of a bulma-box:
https://bulma.io/documentation/elements/box/

Outline the content with a nice rounded border.
-->

<template>
  <div class="box">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'b-box',
};
</script>

<style scoped lang="scss">
</style>
