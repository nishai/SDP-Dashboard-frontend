<template>
    <div>

      <!-- https://bootstrap-vue.js.org/docs/components/modal/ -->
      <b-modal ref="popupRef" id="popup" title="Chart Options" size="lg" hide-footer>
        <b-container fluid>
          <div v-if="text === 'Race'">
            <FilterForm
              v-bind:url="url"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="text === 'Gender'">
            <FilterForm
              v-bind:url="url"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="text === 'Nationality'">
            <FilterForm
              v-bind:url="url"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="text === 'Home Language'">
            <FilterForm
              v-bind:url="url"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="text === 'Demographics vs Marks'">
            <FilterForm
              v-bind:url="url"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:ftype="true"
              v-bind:numForms="2">
            </FilterForm>
          </div>
          <div v-if="text === 'Pass rates by year'">
            <FilterForm
              v-bind:url="url"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="text === 'Pass rates by faculty/course'">
            <FilterForm
              v-bind:url="url"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="text === 'Bell curve'">
            <FilterForm
              v-bind:url="url"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="text === 'Progress outcome by faculty/course'">
            <FilterForm
              v-bind:url="url"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="text === 'Class size vs pass rate'">
            <FilterForm
              v-bind:url="url"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="2">
            </FilterForm>
          </div>
          <div v-if="text === 'Average class size by faculty/course'">
            <FilterForm
              v-bind:url="url"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
        </b-container>
      </b-modal>
    </div>
</template>

<script>
import FilterForm from './FilterForm.vue';

export default {
  name: 'Modal',
  components: {
    FilterForm,
  },
  methods: {
    showModal() {
      this.$refs.popupRef.show();
    },
    hideModal() {
      this.$refs.popupRef.hide();
    },
  },
  props: [
    'url',
    'text',
  ],
};
</script>

<style>
</style>
