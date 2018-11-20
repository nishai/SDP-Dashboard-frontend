<template>
  <div>
    <b-modal ref="popupRef" id="popup" title="Chart Options" size="lg" hide-footer>
      <h1> {{ title }} </h1>
      <b-container fluid>
        <FilterForm
          ref="filterForm"
          :groupByDesc="title"
          :options="options"
        />
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import FilterForm from './FilterForm.vue';

export default {
  name: 'FilterFormModal',
  props: {
    title: { type: String, default: 'Unnamed Modal' },
    options: { type: Object, default() { return {}; } },
  },
  components: {
    FilterForm,
  },

  methods: {
    showModal() {
      this.$refs.popupRef.show();
      this.$refs.filterForm.loadData();
    },
    hideModal() {
      this.$refs.popupRef.hide();
    },
  },
};
</script>

<style>
</style>

