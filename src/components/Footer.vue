<!--
The default footer for the app.
-->

<template>
  <div class="footer">
    Dashboard by Team Potato 🥔 <br>
    Chart Icons by <a href="https://www.flaticon.com/packs/charts-diagrams">Freepik</a> 📊
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style>
.footer {
  right: 0;
  padding: 10px;
  width: 100%;
  margin-left: 0;

  /*color: var(--text-color);*/
  /*background: var(--bg-color-footer);*/
  text-align: right;
  font-size: var(--font-size);
  height: var(--footer-height);

  /* border */
  border-top-width: 1px;
  border-top-color: var(--border-color-footer);
  border-top-style: dotted;
}
</style>
