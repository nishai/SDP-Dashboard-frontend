
<!--
Simple implementation of a bulma-card:
https://bulma.io/documentation/components/card/#

Intended for all of the following to be directly nested under it and nothing else:
  - BulmaCardHeader   b-card-header
  - BulmaCardContent  b-card-content
  - BulmaCardImage    b-card-image
  - BulmaCardFooter   b-card-footer
-->

<template>
  <!-- uses shadow not border -->
  <div class="card">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'b-card',
};
</script>

<style scoped lang="scss">
</style>
