<template>
  <div style="height: 100%; min-height: 1000px" class="h-expander">
    <p class="title">{{ template.desc }}</p>
    <!-- CHART TYPE SELECTOR -->
    <DashboardChartTypeSelector
      @input="(type)=>template.type=type"
      :types-enabled="template.chartTypes"
    />

    <!-- TABBED FILTERS -->
    <OpinionatedTabs class="h-expanded h-expander" :items="subsets" @add="onTabAdded" @delete="onTabDelete">
      <template slot-scope="props">
        <b-field label="Dataset Label">
          <b-input v-model="props.item.label"></b-input>
        </b-field>
        <DashboardCommonFiltersForm class="h-expanded" :selected.sync="props.item.selected"/>
      </template>
    </OpinionatedTabs>
  </div>
</template>

<script>
import DashboardChartTypeSelector from '../dashboard/DashboardChartTypeSelector.vue';
import DashboardCommonFiltersForm from '../dashboard/DashboardCommonFiltersForm.vue';
import OpinionatedTabs from '../opinionated/OpinionatedTabsAddable.vue';

export default {
  name: 'SlideoutChartOptions',
  components: {
    DashboardCommonFiltersForm,
    DashboardChartTypeSelector,
    OpinionatedTabs,
  },
  props: {
    template: {
      type: Object,
      default: undefined,
    },
    subsets: {
      type: Array,
      default: undefined,
    },
  },

  created() {
    if (this.subsets.length < 1) {
      this.onTabAdded();
    }
  },

  methods: {
    onTabAdded(index) {
      this.subsets.push({ label: 'Unknown', selected: { years: [], faculties: [], schools: [], courses: [] } });
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
