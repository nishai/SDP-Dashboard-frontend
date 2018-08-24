<template>
    <div id="sidebar" class="sidenav">
      <a href="#">Template 1</a>
      <a href="#">Template 2</a>
      <a href="#">Template 3</a>
      <a href="#">Template 4</a>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
}
</script>

<style>
#sidebar {
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;
  position: fixed;
  position: fixed;
  background-color:whitesmoke;
}

#sidebar a{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  font-size: 20px;
  padding: 10px 30px;
  text-decoration: none;
  display: block;
}

</style>
