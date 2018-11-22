<!--

Simple chart type selector for vue

has three props:
  :initialType   String        the initial selected item.
  :typesEnabled  Array<String> (list of chart typesEnabled) does not count empty array or null
  :typesDisabled Array<String> (list of chart typesEnabled) does not count empty array or null

has one event.
  @input="(type, item) => ..."  passes item, not type string.

-->

<template>
  <b-field label="Chart Types">
    <OpinionatedSelector
      placeholder="Select a Chart Type"
      @input="onItemSelected"
      label-field="name"
      :initially-selected="initiallySelected"
      :items="items"
      :items-enabled="itemsEnabled"
      :items-disabled="itemsDisabled"
    />
  </b-field>
</template>

<script>
import { getDefaultChartInfo } from '../../assets/js/defaults';
import OpinionatedSelector from '../opinionated/OpinionatedSelector.vue';

const chartInfo = getDefaultChartInfo();

export default {
  name: 'DashboardChartTypeSelector',
  components: { OpinionatedSelector },

  props: {
    initialType: null, // chart type initially selected.
    typesEnabled: { type: Array, default() { return []; } }, // array of chart types strings that are enabled
    typesDisabled: { type: Array, default() { return []; } }, // array of chart types strings that are disabled
  },

  data() {
    return {
      initiallySelected: chartInfo[this.initialType] || (this.typesEnabled.length > 0 ? chartInfo[this.typesEnabled[0]] : undefined),
      items: Object.values(chartInfo),
    };
  },

  computed: {
    itemsEnabled() {
      return this.typesEnabled.map((type) => chartInfo[type]);
    },
    itemsDisabled() {
      return this.typesDisabled.map((type) => chartInfo[type]);
    },
  },

  methods: {
    onItemSelected(item) {
      this.$emit('input', item ? item.type : null, item);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
