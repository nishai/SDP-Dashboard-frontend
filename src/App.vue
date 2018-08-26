<template>
  <div id="app">
    <Sidebar/>
    <Dashboard/>
    <div id = "footer" class="footer">
        <p>Done by Team Potato🥔</p>
    </div>
    <Chart/>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chart from './components/Chart';

export default {
  name: 'App',
  components: {
    Sidebar,
    Dashboard,
    Chart,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#footer {
  position: fixed;
  right: 0;
  bottom: 0;
  padding-right: 10px;
  font-size: 15px;
}
</style>
