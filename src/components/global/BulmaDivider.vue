<!--

https://wikiki.github.io/layout/divider/

-->

<template>
  <div
    :class="isVertical ? 'is-divider-vertical' : 'is-divider'"
    :data-content="text"
  />
</template>

<script>
export default {
  name: 'BulmaDivider',
  props: {
    text: {
      type: String,
      default: undefined,
    },
    isVertical: Boolean,
  },
};
</script>

<style scoped>

</style>
