
<!--
A an opinionated extension of the navbar from:
https://bulma.io/documentation/components/navbar/

Has three props:
  startItems: [{icon, name, children?: [{icon, name, desc}]}]
  endItems: [{icon, name}]

Has two slots:
  brand: brand content (slot is already wrapped in a navbar-item)
  end:   last element after endItems (slot is already wrapped in a navbar-item)
-->

<template>
  <BulmaNavbar id="navbar" :active="active">
    <!-- BRAND -->
    <template slot="brand">
      <BulmaNavbarItem class="has-padding-right-lg">
        <slot name="brand"/>
      </BulmaNavbarItem>
    </template>

    <!-- START -->
    <template slot="start">
      <BulmaNavbarItem v-for="(item, i) in startItems" :to="item.to" :key="i">
        <b-icon class="has-padding-right-sm" v-if="item.icon" :type="item.type" :icon="item.icon"/>
        <span v-if="item.name" class="is-white has-text-white"> {{ item.name }} </span>
        <!-- children -->
        <template slot="dropdown" v-if="item.children">
          <BulmaNavbarItem v-for="(child, j) in item.children" :to="child.to" :key="i+'_'+j">
            <span>
              <b-icon class="has-padding-right-sm" v-if="child.icon" :type="child.type" :icon="child.icon"/>
              <strong> {{ child.name }} </strong>
              <br v-if="child.desc"> {{ child.desc }}
            </span>
          </BulmaNavbarItem>
        </template>
      </BulmaNavbarItem>
    </template>

    <!-- END -->
    <template slot="end">
      <BulmaNavbarItem v-for="(item, i) in endItems" :to="item.to" :key="i">
        <b-icon class="has-padding-right-sm" v-if="item.icon" :type="item.type" :icon="item.icon"/>
        <span v-if="item.name"> {{ item.name }} </span>
      </BulmaNavbarItem>
      <!-- all -->
      <div class="navbar-item">
        <BulmaNavbarItem>
          <slot name="end"/>
        </BulmaNavbarItem>
      </div> <!-- end: all -->
    </template>
  </BulmaNavbar>
</template>

<script>
import BulmaNavbar from '../global/BulmaNavbar.vue';
import BulmaNavbarItem from '../global/BulmaNavbarItem.vue';

export default {
  name: 'OpinionatedNavbar',
  components: {
    BulmaNavbar,
    BulmaNavbarItem,
  },
  props: {
    startItems: Array,
    endItems: Array,
    active: Boolean,
  },
  methods: {
    toggleMenuOpen() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
</style>
