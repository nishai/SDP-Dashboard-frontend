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

/* ========================================================================== */
/* Fix Defaults - https://gist.github.com/robinrendle/1d20c566c5e5fbd67f25    */
/* ========================================================================== */

/*
 * Include padding and border in element's total width and height
 */
*, *:before, *:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing:border-box;
  box-sizing: border-box;
}

/*
 * make sure the app takes up the entire window
 * for example if this was not here, the footer
 * could not be placed at the bottom of the screen
 */
html, body {
  height: 100%;
  width: 100%;
}

/*
 * Fix font rendering defaults
 */
html, button {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-size: 100%;
}

/* ========================================================================== */
/* Vars                                                                       */
/* ========================================================================== */

/*
 * Global CSS variables. Usage eg:
 *   color: var(--text-color);
 */
:root{
  --text-color: #606e78;
  --link-color: #486078;
  --heading-color: #17324d;

  --bg-color: #ffffff;
  --bg-color-sidebar: #f5f6fa;
  --bg-color-footer: #edeff2;

  --optsbar-width: 300px;
  --sidebar-width: 200px;
  --footer-height: 65px;
  --font-size: 14px;
  --font-size-sidebar: 18px;

  --border-color: #eaeaea;
  --border-color-sidebar: #eaeaea;
  --border-color-footer: #eaeaea;
  --border-color-optsbar: #eaeaea;
}

/* ========================================================================== */
/* Global Style                                                               */
/* ========================================================================== */

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

a {
  color: var(--link-color);
  text-decoration: none;
}

a:hover {
  font-weight: bold;
  text-decoration: none;
}

.stroke-primary { stroke: var(--primary); }
.stroke-secondary { stroke: var(--secondary); }
.stroke-success { stroke: var(--success); }
.stroke-danger { stroke: var(--danger); }
.stroke-warning { stroke: var(--warning); }
.stroke-info { stroke: var(--info); }
.stroke-dark { stroke: var(--dark); }
.stroke-muted { stroke: var(--gray); }

.hover-stroke-primary:hover { stroke: var(--primary); }
.hover-stroke-secondary:hover { stroke: var(--secondary); }
.hover-stroke-success:hover { stroke: var(--success); }
.hover-stroke-danger:hover { stroke: var(--danger); }
.hover-stroke-warning:hover { stroke: var(--warning); }
.hover-stroke-info:hover { stroke: var(--info); }
.hover-stroke-dark:hover { stroke: var(--dark); }
.hover-stroke-muted:hover { stroke: var(--gray); }

/* ========================================================================== */
/* Local Style                                                                */
/* ========================================================================== */

.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

