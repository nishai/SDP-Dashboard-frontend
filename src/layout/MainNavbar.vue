<!--
The dashboard navbar extending from OpinionatedNavbar

Has three props:
  startItems: [{icon, name, children?: [{icon, name, desc}]}]
  endItems: [{icon, name}]
  active
-->


<template>
  <OpinionatedNavbar class="is-primary" :active="active" :startItems="startItems" :endItems="endItems">
    <template slot="brand">
      <img src="../../public/img/logo/wits-logo-white.png" alt="Wits Logo"/>
    </template>
    <template slot="end">
      <div class="field is-grouped is-grouped-multiline">
        <OpinionatedNavbarLogin class="is-white has-text-white"/>
      </div>
    </template>
  </OpinionatedNavbar>
</template>

<script>
import { getDefaultNavbarStartItems } from '../assets/js/defaults';
import OpinionatedNavbar from '../components/opinionated/OpinionatedNavbar.vue';
import OpinionatedNavbarLogin from '../components/LoginPrompt.vue';

export default {
  name: 'MainNavbar',
  data() {
    return {
      startItems: getDefaultNavbarStartItems(),
      endItems: [],
      active: false,
    };
  },
  components: {
    OpinionatedNavbar,
    OpinionatedNavbarLogin,
  },
};
</script>

<style scoped>
</style>
