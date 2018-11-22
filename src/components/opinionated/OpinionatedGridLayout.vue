
<!--

This is an opinionated extension of the grid-layout from:
https://github.com/jbaysolutions/vue-grid-layout

Intending to take in a single list of objects,
and if needed set an additional meta property on each item,
that corresponds to the current layout, rather than having
to manage a separate list.

The props available are:
    layout - An array of objects, each object only needs a unique { i },
           - the other properties { w, h, x, y } will be generated automatically if not present.
             MAKE SURE TO USE :layout.sync="layout" when binding.
    isResizable - default: True
    isDraggable - default: True
    cols - The number of columns
    rowHeight - The row height in pixels (default: 300)
    itemHeight: Integer - The default to be used.
    itemWidth: Integer - The default to be used.

Three helper functions are provided:
-->

<template>
  <grid-layout
    :layout.sync="internalLayout"
    :col-num="cols"
    :row-height="rowHeight"
    :is-draggable="isDraggable"
    :is-resizable="isResizable"
    :is-mirrored="false"
    :vertical-compact="true"
    :use-css-transforms="true"
    :margin="[10, 10]"
    @layout-updated="_onLayoutUpdated"
    ref="gridLayout"
  >
    <grid-item
      v-for="(meta, i) in internalLayout"
      :x="meta.x"
      :y="meta.y"
      :w="meta.w"
      :h="meta.h"
      :i="meta.i"
      :key="'meta_'+i"
    >
      <slot :meta="meta" :i="meta.i">
        {{meta}} <!-- overridden if slot is used -->
      </slot>
    </grid-item>
  </grid-layout>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';

export default {
  name: 'OpinionatedGridLayout',

  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },

  props: {
    layout: { type: Array, default() { return []; } },

    isResizable: { type: Boolean, default: true },
    isDraggable: { type: Boolean, default: true },

    cols: { type: Number, default: 3 },
    rowHeight: { type: Number, default: 300 },

    itemHeight: { type: Number, default: 1 },
    itemWidth: { type: Number, default: 1 },
  },

  data() {
    return {
      internalLayout: this._getLayoutUpdatingMetas(this.layout),
    };
  },

  mounted() {
    this.$nextTick(() => {
      this._onLayoutUpdated(this.internalLayout);
    });
  },

  watch: {
    layout() {
      this.internalLayout = this._getLayoutUpdatingMetas(this.layout);
    },
  },

  methods: {
    /**
     * Shrink and re-space all the items in the grid,
     * keeping their order the same.
     *
     * This updates, size, x, and y values of the items metadata
     * so that there are no resulting spaces.
     */
    recalculateGrid() {
      this.internalLayout.concat()
        .sort((a, b) => ((a.y - b.y !== 0) ? a.y - b.y : a.x - b.x))
        .forEach((meta, i) => {
          meta.x = Math.floor(i % this.cols);
          meta.y = Math.floor(i / this.cols);
        });
      this.shrinkGridItems();
    },

    /**
     * Shrink grid items to the defaults.
     *
     * This only updates the size and y positioning of the grid items,
     * and may result in spaces on the x-axis.
     */
    shrinkGridItems() {
      this.internalLayout.forEach((meta) => {
        meta.w = this.itemWidth;
        meta.h = this.itemHeight;
      });
      this.recalculateLayout();
    },

    /**
     * Force the layout to be recalculated,
     * It is appropriate to call this if you have changed any meta data.
     *
     * This only resolves y spaces, and
     * cannot handle cases where gridItems overlap.
     */
    recalculateLayout() {
      this.$refs.gridLayout.layoutUpdate();
      this._onLayoutUpdated(this.internalLayout);
    },

    /**
     * Emit the update:layout event (to be used with the v-bind:layout.sync="layout")
     */
    _onLayoutUpdated(newLayout) {
      this.$emit('update:layout', newLayout.map((meta) => meta));
    },

    /**
     * Create a default item at the specified index.
     */
    _createMeta(id, index) {
      return {
        x: Math.floor(index % this.cols),
        y: Math.floor(index / this.cols),
        w: this.itemWidth,
        h: this.itemHeight,
        i: id || undefined,
      };
    },

    /**
     * Gets the layout array.
     * If no values exist for a meta, it is created using the defaults and overwritten.
     *
     * @return {Array<{x, y, w, h, i}>}
     * @private
     */
    _getLayoutUpdatingMetas(layout) {
      const ids = new Set();
      return layout.map((item, i) => {
        const meta = Object.assign(this._createMeta(item.i, i), item || {});
        /* check if invalid */
        if (!meta.i) {
          throw Error(`Unique id in layout item must be defined, currently: ${meta.i}`);
        }
        if (ids.has(meta.i)) {
          throw Error(`Layout already contains unique id: ${meta.i}`);
        }
        if (typeof meta.x !== 'number' || typeof meta.y !== 'number' || typeof meta.w !== 'number' || typeof meta.h !== 'number') {
          throw Error(`dimensions and position in layout must be defined, currently: x${meta.x} y${meta.y} w${meta.w} h${meta.h}`);
        }
        ids.add(meta.i);
        /* yay, validated! */
        return meta;
      });
    },
  },
};
</script>

<style scoped>

</style>

