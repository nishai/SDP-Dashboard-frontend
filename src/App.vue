<template>
  <div id="app">
    <Sidebar/>
    <div id="app-content">
      <router-view id="app-view"></router-view>
      <div id="footer" class="footer">
          <p>By Team Potato 🥔</p>
          <a href="https://www.flaticon.com/packs/charts-diagrams">Chart icons designed by Freepik from Flaticon</a>
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

html,body {
  height:100%;
  width: 100%;
}

* {
  margin: 0;
  padding: 0;
  /* border: 1px solid black; */
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
  padding: 10px;  /* padding is added on to width */
  width: calc(100% - 20px); /* make sure to keep up to date with sidebar */
  margin-left: 0px; /* make sure to keep up to date with sidebar */

  color: #2c3e50;
  text-align: right;
  background: #f4f6fb;
  font-size: 15px;
  height: 30px;
}

#app-content {
    margin-left: 200px;
    width: calc(100% - 200px);
    height: 100%;
}

#app-view {
    min-height: calc(100% - 30px - 2*10px);
}

</style>
