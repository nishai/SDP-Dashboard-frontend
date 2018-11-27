
<!--
Simple implementation of a bulma-card-header:
https://bulma.io/documentation/components/card/#

Intended to be directly under a bulma-card

has one prop:
  title: string


-->

<template>
  <header class="card-header">
    <p class="card-header-title">
      <slot name="title">
        {{ title }}
      </slot>
    </p>
    <div class="card-header-icon">
      <slot name="icon">
        <b-icon v-if="icon" :icon="icon"/>
      </slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'b-card-header',
  props: {
    title: String,
    icon: null,
  },
};
</script>

<style scoped lang="scss">
</style>
