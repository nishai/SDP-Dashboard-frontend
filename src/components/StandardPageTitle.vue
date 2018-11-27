<!--
Standard layout for a page.

has two properties:
  title:      must be a string
  subtitle?:  must be a string or null
-->

<template>
  <div class="has-padding-bottom-md">
    <p class="title is-2">
      {{ title ? title : "~Title Not Set~" }}
      <slot/>
    </p>
    <p v-if="subtitle" class="subtitle is-3"> {{ subtitle }} </p>
  </div>
</template>

<script>
export default {
  name: 'StandardPageTitle',
  props: {
    title: { type: String, default: undefined },
    subtitle: { type: String, default: undefined },
  },
};
</script>

<style scoped lang="scss">
</style>
