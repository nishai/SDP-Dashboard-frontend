<!--

Simple chart type selector for vue
-->

<template>
  <b-field label="Chart Types">
    <b-select
      :value="item"
      @input="onSelectedChanged"
      placeholder="Select a Chart Type"
      :icon="itemIcon"
      :icon-pack="itemIconPack"
      :expanded="expanded"
    >
      <!-- kinda expensive, re renders list on each selection change... -->
      <option v-for="(item, i) in items" :value="item" :key="'option_'+i">
        {{ item.name }}
      </option>
    </b-select>
  </b-field>
</template>

<script>
import { getDefaultChartInfo } from '../../assets/js/defaults';

const chartInfo = getDefaultChartInfo();

export default {
  name: 'DashboardChartOptionsType',

  props: {
    type: undefined, // chart type initially selected.
    types: { type: Array, default() { return []; } }, // array of chart types strings that are enabled
    /* stretch component */
    expanded: Boolean,
  },

  watch: {
    types() {
      /* reset type if it is invalid */
      if (!this.type || (this.types && this.types.indexOf(this.type) < 0)) {
        this.onSelectedChanged(chartInfo[this.types[0]]);
      }
    },
  },

  computed: {
    item() {
      return chartInfo[this.type];
    },
    items() {
      const typesSet = new Set(this.types || []);
      return Object.values(chartInfo).filter((item) => typesSet.has(item.type));
    },
    itemIcon() {
      return this.item ? this.item.icon : undefined;
    },
    itemIconPack() {
      return this.item ? this.item.iconPack : undefined;
    },
  },

  methods: {
    onSelectedChanged(item) {
      const type = item ? item.type : null;
      this.$emit('update:type', type);
      this.$emit('input', type);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
