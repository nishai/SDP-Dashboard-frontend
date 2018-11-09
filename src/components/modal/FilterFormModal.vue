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
							ref="raceForm"
              v-bind:chartTypeOptions="[['doughnut']]"
              v-bind:ftype="true"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1"
              v-bind:selectedChartType="chartType"
							v-bind:compare="false">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Gender'">
            <FilterForm
							ref="genderForm"
              v-bind:chartTypeOptions="[['pie']]"
              v-bind:ftype="true"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1"
              v-bind:selectedChartType="chartType"
							v-bind:compare="false">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Nationality'">
            <FilterForm
							ref="nationalityForm"
              v-bind:chartTypeOptions="[['pie']]"
              v-bind:ftype="true"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1"
              v-bind:selectedChartType="chartType"
							v-bind:compare="false">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Home Language'">
            <FilterForm
							ref="languageForm"
              v-bind:chartTypeOptions="[['pie']]"
              v-bind:ftype="true"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1"
              v-bind:selectedChartType="chartType"
							v-bind:compare="false">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Demographics vs Marks'">
            <FilterForm
							ref="demographicsForm"
              v-bind:chartTypeOptions="[['line']]"
              v-bind:ftype="true"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="2"
							v-bind:compare="false">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Pass rates by year'">
            <FilterForm
							ref="passByYearForm"
              v-bind:chartTypeOptions="[['bar']]"
              v-bind:ftype="true"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1"
              v-bind:selectedChartType="chartType"
							v-bind:compare="false">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Pass rates by faculty/course'">
            <FilterForm
							ref="passByCourseForm"
              v-bind:chartTypeOptions="[['bar']]"
              v-bind:ftype="true"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1"
              v-bind:selectedChartType="chartType"
							v-bind:compare="false">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Bell curve'">
            <FilterForm
							ref="bellForm"
              v-bind:chartTypeOptions="[['line']]"
              v-bind:ftype="true"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1"
              v-bind:selectedChartType="chartType"
							v-bind:compare="false">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Progress outcome by faculty/course'">
            <FilterForm
							ref="progressForm"
              v-bind:chartTypeOptions="[['bar']]"
              v-bind:ftype="true"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1"
              v-bind:selectedChartType="chartType"
							v-bind:compare="false">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Class size vs pass rate'">
            <FilterForm
							ref="classSizeForm"
              v-bind:chartTypeOptions="[['line']]"
              v-bind:ftype="true"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="2"
							v-bind:compare="false">
            </FilterForm>
          </div>
          <div v-if="groupByDesc === 'Average class size by faculty/course'">
            <FilterForm
							ref="classSizeByCourseForm"
              v-bind:chartTypeOptions="[['bar']]"
              v-bind:ftype="true"
              v-bind:groupByDesc="groupByDesc"
              v-bind:fyear="true"
              v-bind:fcourse="true"
              v-bind:ffaculty="true"
              v-bind:fschool="true"
              v-bind:numForms="1"
              v-bind:selectedChartType="chartType"
							v-bind:compare="false">
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
      switch (this.groupByDesc) {
        case 'Race':
          this.$refs.raceForm.loadData();
          break;
        case 'Gender':
          this.$refs.genderForm.loadData();
          break;
        case 'Nationality':
          this.$refs.nationalityForm.loadData();
          break;
        case 'Home Language':
          this.$refs.languageForm.loadData();
          break;
        case 'Demographics vs Marks':
          this.$refs.demographicsForm.loadData();
          break;
        case 'Pass rates by year':
          this.$refs.passByYearForm.loadData();
          break;
        case 'Pass rates by faculty/course':
          this.$refs.passByCourseForm.loadData();
          break;
        case 'Bell curve':
          this.$refs.bellForm.loadData();
          break;
        case 'Progress outcome by faculty/course':
          this.$refs.progressForm.loadData();
          break;
        case 'Class size vs pass rate':
          this.$refs.classSizeForm.loadData();
          break;
        case 'Average class size by faculty/course':
          this.$refs.classSizeByCourseForm.loadData();
          break;
      }
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

