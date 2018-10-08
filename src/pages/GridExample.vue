<template>
  <div class="Grid">
      <grid-layout
            :layout="layout"
            :col-num="12"
            :row-height="12"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
    >

        <grid-item v-for="(item, id) in layout"
                   :key="id"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i">
            {{item.i + "fucklit"}}
        </grid-item>
    </grid-layout>
  </div>
</template>

<!-- <script src="../components/grid/vue-grid-layout.umd.min.js"></script> -->
<script>
/* eslint-disable */

// import GridItem from '../components/grid/GridItem.vue';
// import GridLayout from '../components/grid/GridLayout.vue';
// import VueGridLayout from 'vue-grid-layout';
import { GridLayout } from 'vue-grid-layout';
import { GridItem } from 'vue-grid-layout';

var testLayout = [
        {"x":0,"y":0,"w":2,"h":5,"i":"0"},
        {"x":2,"y":0,"w":2,"h":5,"i":"1"},
        {"x":4,"y":0,"w":2,"h":5,"i":"2"},
        {"x":6,"y":0,"w":2,"h":5,"i":"3"},
        {"x":8,"y":0,"w":2,"h":5,"i":"4"}
    ];

    // var GridLayout = VueGridLayout.GridLayout;
    // var GridItem = VueGridLayout.GridItem;
// NBNBNB: ADD layout=getresources in html to get all the charts dynamically (like in bugcity example)
export default {
  name: 'GridExample',
  data: function () { return { layout: testLayout } },
  components: {
  },
};
</script>

<style>

</style>
