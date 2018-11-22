
<!--
Simple implementation of a bulma-card-image:
https://bulma.io/documentation/components/card/#

Intended to be nested directly under a bulma-card

Inteded to directly contain an image component.
-->

<template>
  <div class="card-image">
    <slot/> <!-- TODO: convert into href to image, with sizing options -->
  </div>
</template>

<script>
export default {
  name: 'b-card-image',
};
</script>

<style scoped lang="scss">
</style>
