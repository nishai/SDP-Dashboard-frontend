
<!--
Simple implementation of the navbar-item from:
https://bulma.io/documentation/components/navbar/

A navbar-item is a repeatable element that can be:

- a navigation link
- a container for the brand logo
- the parent of a dropdown menu
    - a child of a navbar dropdown
- a container for almost anything you want, like a field

It can either be an anchor tag <a> or a <div>, as a direct child of either:
  navbar
  navbar-brand
  navbar-start
  navbar-end
  navbar-dropdown

Modifiers:
  is-expanded     to turn it into a full-width element
  is-tab          to add a bottom border on hover and show the bottom border using is-active
-->

<template>
  <div :class="['navbar-item', navbarItemClasses]">
    <router-link v-if="to" :to="to">
      <slot/>
    </router-link>
    <slot v-else/>

    <div v-if="!!$slots.dropdown" :class="['navbar-dropdown', {'is-boxed': boxed}]">
      <slot name="dropdown"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'b-navbar-item',
  props: {
    /* the router-link */
    to: String,
    /* attributes */
    active: Boolean, // manually show the dropdown, or the tab underline
    arrowless: Boolean, // dont show an arrow when there is a dropdown
    hoverable: { default: true, type: Boolean }, // show the dropdown when hovered over
    tab: Boolean, // show an underline on the item, when active
    expanded: Boolean, // set the item to a full-width element
    boxed: Boolean, // set the dropdown shape to rounded
  },
  computed: {
    /**
     * Helper method to compute general
     * css properties for the navbar item
     * based on the props
     */
    navbarItemClasses() {
      return {
        'has-dropdown': !!this.$slots.dropdown,
        'is-active': this.active,
        'is-hoverable': this.hoverable,
        'is-tab': this.tab,
        'is-expanded': this.expanded,
        'is-arrowless': this.arrowless,
      };
    },
  },
};
</script>

<style scoped lang="scss">
</style>
