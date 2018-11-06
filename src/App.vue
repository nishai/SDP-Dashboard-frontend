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
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  components: {
    Menubar,
    Sidebar,
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
    z-index: 999999999;
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
    height: 100%;
  }

  .app-content {
    min-height: calc(100% - var(--footer-height));
    padding: 25px;
  }
</style>
