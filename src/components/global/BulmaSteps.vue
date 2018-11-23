<!--

https://wikiki.github.io/components/steps/

-->

<template>
  <ul class="steps">
    <slot/>
  </ul>
</template>

<script>
export default {
  name: 'b-steps',
  props: {
    size: {
      type: String, // is-small, undefined, is-medium, is-large
      default: undefined,
    },
  },
};
</script>

<style scoped>

</style>
