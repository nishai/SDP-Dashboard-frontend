<template>
    <div>
      <!-- TODO: TURN INTO SINGULAR COMPONENT, WITH PROPS -->
      <!-- TODO: TURN INTO SINGULAR COMPONENT, WITH PROPS -->
      <!-- TODO: TURN INTO SINGULAR COMPONENT, WITH PROPS -->
      <!-- TODO: TURN INTO SINGULAR COMPONENT, WITH PROPS -->
      <!-- TODO: TURN INTO SINGULAR COMPONENT, WITH PROPS -->
      <!-- https://bootstrap-vue.js.org/docs/components/modal/ -->
      <b-modal ref="popupRef" id="popup" title="Chart Options" size="lg" hide-footer>
        <b-container fluid>
          <div v-if="groupByDesc === 'Race'">
            <FilterForm
              v-bind:chartType="chartType"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Gender'">
            <FilterForm
              v-bind:chartType="chartType"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Nationality'">
            <FilterForm
              v-bind:chartType="chartType"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Home Language'">
            <FilterForm
              v-bind:chartType="chartType"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Demographics vs Marks'">
            <FilterForm
              v-bind:chartType="chartType"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:ftype="true"
              v-bind:numForms="2">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Pass rates by year'">
            <FilterForm
              v-bind:chartType="chartType"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Pass rates by faculty/course'">
            <FilterForm
              v-bind:chartType="chartType"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Bell curve'">
            <FilterForm
              v-bind:chartType="chartType"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Progress outcome by faculty/course'">
            <FilterForm
              v-bind:chartType="chartType"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Class size vs pass rate'">
            <FilterForm
              v-bind:chartType="chartType"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="2">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Average class size by faculty/course'">
            <FilterForm
              v-bind:chartType="chartType"
              v-bind:groupByDesc="groupByDesc"
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
  name: 'FilterFormModal',
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
    'chartType',
    'groupByDesc',
  ],
};
</script>

<style>
</style>

