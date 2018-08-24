<template>
  <div id="app">
    <Sidebar/>
    <div id="stuff">
      <h1>"Blank Site"</h1>
      <h2>by Team Potato🥔</h2>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'

export default {
  name: 'App',
  components: {
    Sidebar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

#stuff {
  text-align :center;
  margin-left: 200px;
}
</style>
