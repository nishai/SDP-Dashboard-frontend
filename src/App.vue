<template>
  <div id="app">
    <div id="sidebar" class="sidenav">
      <a href="#">Template 1</a>
      <a href="#">Template 2</a>
      <a href="#">Template 3</a>
      <a href="#">Template 4</a>
    </div>
    <div id="stuff">
      <h1>"Blank Site"</h1>
      <h2>by Team Potato🥔</h2>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
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

#sidebar {
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;
  position: fixed;
  position: fixed;
  background-color: whitesmoke;
}

#sidebar a{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: black;
  font-size: 20px;
  padding: 10px 30px;
  text-decoration: none;
  display: block;
}

#stuff {
  text-align :center;
  margin-left: 200px;
}
</style>
