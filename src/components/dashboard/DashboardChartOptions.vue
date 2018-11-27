<template>
  <div style="height: 100%" class="h-expander">
    <p class="title">{{ templateItem.desc }}</p>

    <b-field label="Chart Name">
      <b-input :value="name" @input="onNameChange" :placeholder="templateItem.desc" expanded></b-input>
    </b-field>

    <!-- CHART TYPE SELECTOR -->
    <DashboardChartOptionsType
      @input="onTypeChange"
      :type="type"
      :types="templateItem.chartTypes"
      expanded
    />

    <!-- TABBED FILTERS -->
    <OpinionatedTabs class="h-expand" :items="subsets" @add="onTabAdded" @delete="onTabDelete">
      <template slot-scope="props">
        <b-field label="Dataset Label">
          <b-input v-model="props.item.label"></b-input>
        </b-field>
        <DashboardChartOptionsFilterForm class="h-expanded" :selected.sync="props.item.selected"/>
      </template>
    </OpinionatedTabs>
  </div>
</template>

<script>
import { CHART_TEMPLATES } from '../../assets/js/charts/templates';
import DashboardChartOptionsType from './DashboardChartOptionsType.vue';
import DashboardChartOptionsFilterForm from './DashboardChartOptionsFilterForm.vue';
import OpinionatedTabs from '../opinionated/OpinionatedTabsAddable.vue';

export default {
  name: 'DashboardChartOptions',
  components: {
    DashboardChartOptionsFilterForm,
    DashboardChartOptionsType,
    OpinionatedTabs,
  },
  props: {
    name: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: undefined,
    },
    template: {
      type: String,
      default: undefined,
    },
    subsets: {
      type: Array,
      default: undefined,
    },
  },

  computed: {
    templateItem() {
      return CHART_TEMPLATES[this.template] || {};
    },
  },

  created() {
    if (this.subsets.length < 1) {
      this.onTabAdded();
    }
  },

  methods: {
    onNameChange(value) {
      this.$emit('update:name', value);
    },

    onTypeChange(value) {
      this.$emit('update:type', value);
    },

    onTabAdded(index) {
      this.subsets.push({ label: 'Unnamed Dataset', selected: { years: [], faculties: [], schools: [], courses: [] } });
      this.$emit('update:subsets', this.subsets);
    },

    onTabDelete(index) {
      this.subsets.splice(index, 1);
      this.$emit('update:subsets', this.subsets);
    },
  },
};
</script>

<style scoped>

</style>
