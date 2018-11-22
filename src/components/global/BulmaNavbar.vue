
<!--
Simple implementation of the navbar from:
https://bulma.io/documentation/components/navbar/

three slots are available:
  brand: always visible.
  start: next to brand, but part of dropdown on mobile.
  end:   away from brand, but part of dropdown on mobile.

Each item in each slot should be a navbar-item instance.

Has one property:
  active: that indicates if the menu is open on mobile.
-->

<template>
  <nav id="navbar" class="navbar">
    <!-- (always visible) -->
    <div class="navbar-brand">
      <slot v-if="!!$slots.brand" name="brand"/>
      <div
        v-if="!!$slots.start || !!$slots.end"
        :class="['navbar-burger', 'burger', {'is-active': active}]"
        @click="toggleMenuOpen"
        data-target="navMenuExpo">
        <!-- used to generate burger icon -->
        <span/><span/><span/>
      </div>
    </div>
    <!-- (dropdown for mobile) -->
    <div id="navMenuExpo" :class="['navbar-menu', {'is-active': active}]">
      <div v-if="!!$slots.start" class="navbar-start"><slot name="start"/></div>
      <div v-if="!!$slots.end" class="navbar-end"><slot name="end"></slot></div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'b-navbar',
  props: {
    active: Boolean, // if the menu is open on mobile.
  },
  methods: {
    /**
     * Open or close the menu,
     * ie. toggles the state of active=!active
     */
    toggleMenuOpen() {
      this.active = !this.active;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
