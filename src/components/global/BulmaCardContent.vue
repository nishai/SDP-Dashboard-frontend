
<!--
Simple implementation of a bulma-card-content:
https://bulma.io/documentation/components/card/#

Intended to be nested directly under a bulma-card
-->

<template>
  <div class="card-content">
    <slot class="content"/>
  </div>
</template>

<script>
export default {
  name: 'b-card-content',
};
</script>

<style scoped lang="scss">
</style>
