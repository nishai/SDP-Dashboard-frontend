<!--
The entry point for Vue defining the app's base component.

The sidebar, footer, and content are defined here.
  - The content is defined by an instance of Vue Router,
    which dynamically changes the content based on the current route.
-->

<template>
  <div class="app expand">
    <Menubar class="app-menubar"/>
    <div class="expand">
      <Sidebar class="app-sidebar"/>
      <Optsbar/>
      <div class="app-viewport">
        <router-view class="app-content">
          This will be replaced
        </router-view>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<!-- SCRIPT -->

<script>
import Menubar from './components/menubar/Menubar.vue';
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
    Menubar,
    Sidebar,
    Optsbar,
    Footer,
  },
};
</script>

<!-- STYLE -->

<style>
  .app {}

  .expand {
    width: 100%;
    height: 100%;
  }

  .app-menubar {
    position: fixed;
    left: 0;
    top: 0;
    height: 80px;
    min-height: 80px;
  }

  .app-sidebar {
    position: fixed;
    left: 0;
    top: 80px;
  }

  .app-viewport {
    margin-top: 80px;
    margin-left: var(--sidebar-width);
    width: calc(100% - var(--sidebar-width));
    height: calc(100% - 80px);
  }

  .app-content {
    min-height: calc(100% - var(--footer-height));
    padding: 25px;
  }
</style>
