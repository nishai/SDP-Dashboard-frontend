<template>
  <transition name="fade">
    <div class="optsbar" v-if="open" :class="$style.optsbar">
      <component :is="component"/>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Optsbar',
  computed: {
    open() {
      return this.$store.state.ui.optsbarOpen;
    },
    component() {
      return this.$store.state.ui.optsbarComponent;
    },
  },
};
</script>

<style module>
.optsbar {
  position: fixed;
  right: 0;
  top: 0;
  width: 200px;
  height: 100vh;
  max-width: 90vw;
  background-color: var(--border-color-optsbar);
  padding: 1rem;
}
</style>
