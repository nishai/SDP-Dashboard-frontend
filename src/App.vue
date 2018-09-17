<template>
  <div id="app">
    <Sidebar/>
    <div id="app-content">
      <router-view id="app-view"></router-view>
      <div id="footer" class="footer">
        Dashboard by Team Potato 🥔 <br>
        Chart Icons by <a href="https://www.flaticon.com/packs/charts-diagrams">Freepik</a> 📊
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
};
</script>

<style>
/* make sure the app takes up the entire window */
/* for example if this was not here, the footer */
/* could not be placed at the bottom of the screen */
html,body {
  height:100%;
  width: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}

#footer {
  right: 0;
  padding: 10px;    /* padding is added on to width */
  width: 100%;      /* padding is included in this */
  margin-left: 0;

  color: #2c3e50;
  text-align: right;
  background: #f4f6fb;
  font-size: 15px;
  height: 65px;    /* padding is included in this */
}

#app-content {
  margin-left: 200px;         /* make sure to keep up to date with sidebar */
  width: calc(100% - 200px);  /* make sure to keep up to date with sidebar */
  height: 100%;
}

#app-view {
  min-height: calc(100% - 65px - 16px); /* why tf is there also the -16px */
}
</style>
