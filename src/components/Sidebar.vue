<template>
    <div id="sidebar" class="sidenav">
      <div id=sidebar_heading> Navigate </div>
      <div id="sidebar_links" v-for="item in links" :key="item.path">
        <router-link :to="item.path"> {{ item.name }} </router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      links: [
        {
          name: 'Home',
          path: '/',
        },
        {
          name: 'Reports',
          path: '/reports',
        },
        {
          name: 'Dashboard',
          path: '/dashboard',
        },
        {
          name: 'Templates',
          path: '/templatescreen',
        },
      ],
    };
  },
};
</script>

<style>
#sidebar {
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;

  position: fixed;
  position: fixed;
  background-color:#edf0f4;

  color: #2c3e50;
  font-size: 20px;
  display: block;
}

#sidebar a{
  color: #2c3e50;
  font-size: 20px;
  padding: 5px 40px;
  text-decoration: none;
  display: block;
}

#sidebar_heading {
  font-weight: bold;
  padding: 15px 20px;
}
#sidebar_links:hover {
  font-weight: bold;
  box-shadow: 0 0 5px #000000;
}

</style>
