<!--
The entry point for Vue defining the app's base component.

The sidebar, footer, and content are defined here.
  - The content is defined by an instance of Vue Router,
    which dynamically changes the content based on the current route.
-->

<template>
  <div class="app">
    <Sidebar/>
    <Optsbar/>
    <div class="viewport">
      <router-view class="content">
        This will be replaced
      </router-view>
      <Footer/>
    </div>
  </div>
</template>

<!-- SCRIPT -->

<script>
import Sidebar from './components/sidebar/Sidebar.vue';
import Optsbar from './components/sidebar/Optsbar.vue';
import Footer from './components/Footer.vue';
/* Import CSS Globally */
import './assets/css/defaults.css';
import './assets/css/bootstrapExtensions.css';
import './assets/css/dashboard.css';
import './assets/css/wits.css';

export default {
  name: 'app',
  components: {
    Sidebar,
    Optsbar,
    Footer,
  },
};
</script>

<!-- STYLE -->

<style>
  .app {
    width: 100%;
    height: 100%;
  }

  .viewport {
    margin-left: var(--sidebar-width);
    width: calc(100% - var(--sidebar-width));
    height: 100%;
  }

  .content {
    min-height: calc(100% - var(--footer-height));
    padding: 25px;
  }
</style>
