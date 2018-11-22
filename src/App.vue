<!--
The entry point for Vue defining the app's base component.
  - The content is defined by an instance of Vue Router,
    which dynamically changes the content based on the current route.

The reason that this component is effectively empty
is to decouple everything from the entrypoint, and make things easier to change in future.
  - for example if we needed to add a global alert.
-->

<template>
    <router-view :key="$route.fullPath"></router-view>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss" scoped> /* scoped means that the css is only accessible to this vue component */
</style>
